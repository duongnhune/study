import { readFileSync } from 'fs';
import * as path from 'path';
import { parse, compileScript, compileTemplate, type CompilerOptions, type SFCDescriptor, type BindingMetadata, type SFCScriptCompileOptions, compileStyleAsync } from "@vue/compiler-sfc";
import hash from 'hash-sum';
import LeanCss from 'clean-css'
import { Command } from 'commander';
import env from 'dotenv';
env.config();

const program = new Command();
program
  .requiredOption('-d, --dir <input>', 'input directory')
  .requiredOption('-n, --name <output>', 'input widget name')
  .option('--prod', 'production mode')
  .parse();

const options = program.opts();
const fileName = options.name;
const isProd = options.prod;

const dir = path.resolve(options.dir);
const tsFilePath = path.resolve(dir, `${fileName}.ts`);
const vueFilePath = path.resolve(dir, `${fileName}.vue`);

if (!existsSync(dir)) {
  console.error(`The directory "${dir}" does not exist.`);
  process.exit(1);
}

if (!existsSync(tsFilePath)) {
  console.error(`The file "${fileName}.js" does not exist in the directory "${dir}".`);
  process.exit(1);
}

if (!existsSync(vueFilePath)) {
  console.error(`The file "${fileName}.vue" does not exist in the directory "${dir}".`);
  process.exit(1);
}

const COMP_IDENTIFIER = `__bz__`;
const IMPORT_IDENTIFIER = `__bz_import__`;
const devMode = false;

// @ts-ignore
import babelPluginTransformModulesCommonjs from '@babel/plugin-transform-modules-commonjs'

import {
  transformFromAstAsync as babel_transformFromAstAsync,
  types as t,
  traverse,
} from '@babel/core';

import {
  parse as babel_parse,
  type ParserOptions,
} from '@babel/parser';


import babelPlugin_jsx from '@vue/babel-plugin-jsx'
// @ts-ignore
import babelPlugin_typescript from '@babel/plugin-transform-typescript'
import { existsSync } from 'fs';


async function transformJS(source: string, filename: string, isTs: boolean, isJsx: boolean) {

  let ast: t.File;
  try {

    const plugins: ParserOptions["plugins"] = []
    if (isTs) plugins.push('typescript')
    if (isJsx) plugins.push('jsx')

    ast = babel_parse(source, {
      sourceType: 'module',
      sourceFilename: filename.toString(),
      plugins: plugins,
    });

    // rename dynamic import
    traverse(ast, {
      CallExpression(path: any) {
        if (t.isImport(path.node.callee))
          path.replaceWith(t.callExpression(t.identifier(IMPORT_IDENTIFIER), path.node.arguments))
      }
    });
  } catch (ex) {
    console.log('error', 'parse script', ex);
    return
  }

  const additionalBabelPlugins =
  {
    'jsx': babelPlugin_jsx,
    'typescript': babelPlugin_typescript
  }

  const pluginList = [
    babelPluginTransformModulesCommonjs,
    ...additionalBabelPlugins !== undefined ? Object.values(additionalBabelPlugins) : [],
  ]

  const transformedScript = await babel_transformFromAstAsync(ast, source, {
    sourceMaps: false,
    plugins: pluginList,
    presets: ["minify"],
    babelrc: false,
    configFile: false,
    highlightCode: false,
    compact: !devMode,
    comments: devMode,
    retainLines: devMode,
    minified: true,
    sourceType: 'module',
  });

  if (transformedScript === null || transformedScript.code == null) {
    const msg = `unable to transform script "${filename.toString()}"`;
    throw new Error(msg)
  }
  return transformedScript.code; 
}

async function doCompileScript(
  descriptor: SFCDescriptor,
  id: string,
  isTS: boolean,
  isJSX: boolean
): Promise<[string, Record<string, any> | undefined]> {
  if (descriptor.script || descriptor.scriptSetup) {

    const expressionPlugins: CompilerOptions["expressionPlugins"] = [];
    if (isTS) expressionPlugins.push('typescript');
    if (isJSX) expressionPlugins.push('jsx');

    const parserPlugins: SFCScriptCompileOptions["babelParserPlugins"] = [];
    if (isJSX) parserPlugins.push("jsx");
    if (isTS) parserPlugins.push("typescript");

    const compiledScript = compileScript(descriptor, {
      id,
      isProd: false,
      inlineTemplate: false,
      genDefaultAs: COMP_IDENTIFIER,
      babelParserPlugins: parserPlugins,
      templateOptions: {
        ssrCssVars: descriptor.cssVars,
        compilerOptions: {
          expressionPlugins,
        },
      },
    });

    let source = compiledScript.content;
    return [source, compiledScript.bindings];
  } else {
    // @ts-expect-error
    const vaporFlag = descriptor.vapor ? '__vapor: true' : '';
    return [`\nconst ${COMP_IDENTIFIER} = { ${vaporFlag} }`, undefined];
  }
}

async function doCompileTemplate(
  descriptor: SFCDescriptor,
  id: string,
  bindingMetadata: BindingMetadata | undefined,
  isTS: boolean,
  isJSX: boolean,
) {
  const expressionPlugins: CompilerOptions['expressionPlugins'] = []
  if (isTS) {
    expressionPlugins.push('typescript')
  }
  if (isJSX) {
    expressionPlugins.push('jsx')
  }

  let { code, errors } = compileTemplate({
    id,
    isProd: false,
    // @ts-expect-error
    vapor: descriptor.vapor,
    ast: descriptor.template!.ast,
    source: descriptor.template!.content,
    filename: descriptor.filename,
    scoped: descriptor.styles.some((s) => s.scoped),
    slotted: descriptor.slotted,
    ssrCssVars: descriptor.cssVars,
    compilerOptions: {
      bindingMetadata,
      expressionPlugins,
    },
  })
  if (errors.length) {
    return errors
  }

  const fnName = `render`
  code =
    `\n${code.replace(
      /\nexport (function|const) (render|ssrRender)/,
      `$1 ${fnName}`,
    )}` + `\n${COMP_IDENTIFIER}.${fnName} = ${fnName}`

  return code
}


async function run() {
  const inputPath = process.argv[2];

  if (!inputPath) {
    console.error('Please provide the path to the Vue file.');
    process.exit(1);
  }

  const fileName = path.basename(vueFilePath);
  const fileContent = readFileSync(vueFilePath, 'utf-8');

  const { descriptor } = parse(fileContent, {
    filename: fileName,
    sourceMap: true,
  });

  const scriptLang = descriptor.script?.lang || descriptor.scriptSetup?.lang;
  const isTS = !!(scriptLang && /(\.|\b)tsx?$/.test(scriptLang));
  const isJSX = !!(scriptLang && /(\.|\b)tsx?$/.test(scriptLang));

  if (scriptLang && scriptLang !== 'js' && !isTS && !isJSX) {
    console.error(`Unsupported lang "${scriptLang}" in <script> blocks.`);
    process.exit(1);
  }

  let combineScript = ""
  const id = hash(fileName);
  const hasScoped = descriptor.styles.some((s) => s.scoped)

  const [script, bindings] = await doCompileScript(descriptor, id, isTS, isJSX);
  combineScript += script;

  if (descriptor.template) {
    const clientTemplateResult = await doCompileTemplate(
      descriptor,
      id,
      bindings,
      isTS,
      isJSX,
    )
    if (Array.isArray(clientTemplateResult)) {
      return clientTemplateResult
    }
    combineScript += `;${clientTemplateResult}`
  }

  if (hasScoped) {
    combineScript += `;\n${COMP_IDENTIFIER}.__scopeId = ${JSON.stringify(`data-v-${id}`)}`
  }
  combineScript +=
    `\n${COMP_IDENTIFIER}.__file = ${JSON.stringify(fileName)}` +
    `\nexport default ${COMP_IDENTIFIER}`


  let combineStyle = ''
  for (const style of descriptor.styles) {
    if (style.module) {
      console.error(`❌ <style module> is not supported.`);
      return
    }
    if (!style.scoped) {
      console.error(`❌ Only support <style scoped>.`);
      return
    }


    const styleResult = await compileStyleAsync({
      id,
      source: style.content,
      filename: fileName,
      scoped: style.scoped,
      preprocessLang: style.lang == 'scss' ? 'scss' : undefined,
      modules: false,
    });
    if (styleResult.errors.length) {
      console.error(`❌ Build style error.`);
      console.error(styleResult.errors);
      return
    } else {
      combineStyle += styleResult.code + '\n'
    }
  }

  const transformScript = await transformJS(combineScript, fileName, isTS, isJSX);
  const transformStyle = (() => {
    if (combineStyle) {
      const cleanCss = new LeanCss({}).minify(combineStyle);
      if (cleanCss.errors.length) {
        console.error('cleanCss.errors', cleanCss.errors);
        return '';
      }
      return cleanCss.styles;
    }
    return '';
  })();

  console.log("✅ Build module successfully.");

  const widgetType = (await import(tsFilePath)).default;
  widgetType.sfcSource = fileContent;
  widgetType.scriptSource = transformScript;
  widgetType.styleSource = transformStyle;

  const apiUrl = !isProd ? process.env.ADMIN_DEV_API_URL : process.env.ADMIN_PROD_API_URL;
  const token = !isProd ? process.env.ADMIN_DEV_API_TOKEN : process.env.ADMIN_PROD_API_TOKEN;
  const response = await fetch(`${apiUrl}/widget-type?key=${widgetType.key}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

  if (response.status != 200) {
    console.error(`❌ Fetch widget type "${widgetType.key}" failed.`);
    process.exit(1);
  } else {
    console.log(`✅ Fetch ${widgetType.key} widget successfully.`);
  }

  const data = await response.json();
  let method = "";
  let originWidgetType: any = {};

  if (!data || !data.items || !data.items[0]) {
    console.error(`❌ The widget type "${widgetType.key}" does not exist.`); 
    method = "POST";
  } else {
    method = "PUT";
    originWidgetType = data.items[0];
    if (originWidgetType.key != widgetType.key) {
      console.error(`❌ The key "${widgetType.key}" != "${originWidgetType.key}".`);
      process.exit(1);
    }
  }

  const updateResponse = await fetch(`${apiUrl}/widget-type`, {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...originWidgetType,
      ...widgetType,
    })
  })
  if (updateResponse.status == 200) {
    console.log(`✅ Call put API successfully.`);
  } else {
    console.error(`❌ Call put API failed.`);
    console.log(updateResponse.status);
    console.log(await updateResponse.json());
  }
}
run();