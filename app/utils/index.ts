import type { SiteTheme } from "@breezingin/breezing-shared";

export function parseScopedStyles(css: string, scope: string) {
    let result = '';
    let insideBrackets = false;
    for (let i = 0; i < css.length; i++) {
        if (css[i] === '{') {
            insideBrackets = true;
        } else if (css[i] === '}') {
            insideBrackets = false;
            result += css[i];
            if (i + 1 < css.length && css[i + 1] !== ' ' && css[i + 1] !== '\n' && css[i + 1] !== '\t') {
                result += `[${scope}] `;
            }
            continue;
        }
        if (!insideBrackets && (i === 0 || css[i - 1] === '}')) {
            result += `[${scope}] `;
        }
        result += css[i];
    }
    return result;
}

export function applyTheme(theme: SiteTheme) {
    if (!theme) return;
  
    const root = document.documentElement;
  
    if (theme.primaryColor?.hexColor) {
      root.style.setProperty("--bs-primary", theme.primaryColor.hexColor);
    }
    if (theme.primaryColor?.rgbColor) {
      root.style.setProperty("--bs-primary-rgb", theme.primaryColor.rgbColor);
    }
  
    if (theme.secondaryColor?.hexColor) {
      root.style.setProperty("--bs-secondary", theme.secondaryColor.hexColor);
    }
    if (theme.secondaryColor?.rgbColor) {
      root.style.setProperty("--bs-secondary-rgb", theme.secondaryColor.rgbColor);
    }
  
    if (theme.darkColor?.hexColor) {
      root.style.setProperty("--bs-dark", theme.darkColor.hexColor);
    }
    if (theme.darkColor?.rgbColor) {
      root.style.setProperty("--bs-dark-rgb", theme.darkColor.rgbColor);
    }
  
    if (theme.lightColor?.hexColor) {
      root.style.setProperty("--bs-light", theme.lightColor.hexColor);
    }
    if (theme.lightColor?.rgbColor) {
      root.style.setProperty("--bs-light-rgb", theme.lightColor.rgbColor);
    }
  
    if (theme.text?.fontFamily) {
      root.style.setProperty("--font-site", theme.text.fontFamily);
    }
    if (theme.titleText?.fontFamily) {
      root.style.setProperty("--font-title", theme.titleText.fontFamily);
    }
    if (theme.descText?.fontFamily) {
      root.style.setProperty("--font-desc", theme.descText.fontFamily);
    }
    if (theme.detailText?.fontFamily) {
      root.style.setProperty("--font-detail", theme.detailText.fontFamily);
    }
  
    if (theme.text?.color) {
      root.style.setProperty("--text-color-site", theme.text.color);
    }
    if (theme.titleText?.color) {
      root.style.setProperty("--text-color-title", theme.titleText.color);
    }
    if (theme.descText?.color) {
      root.style.setProperty("--text-color-desc", theme.descText.color);
    }
    if (theme.detailText?.color) {
      root.style.setProperty("--text-color-detail", theme.detailText.color);
    }
  
    if (theme.containerWidthLg) {
      root.style.setProperty("--container-lg-width", theme.containerWidthLg);
    }
    if (theme.containerWidthXl) {
      root.style.setProperty("--container-xl-width", theme.containerWidthXl);
    }
    if (theme.containerWidthXxl) {
      root.style.setProperty("--container-xxl-width", theme.containerWidthXxl);
    }
  
    if (theme.blockPadding?.unit) {
      root.style.setProperty("--padding-unit", theme.blockPadding.unit);
    }
    if (theme.blockPadding?.unitMd) {
      root.style.setProperty("--padding-unit-md", theme.blockPadding.unitMd);
    }
    if (theme.blockPadding?.unitLg) {
      root.style.setProperty("--padding-unit-lg", theme.blockPadding.unitLg);
    }
  
    if (theme.blockMargin?.unit) {
      root.style.setProperty("--margin-unit", theme.blockMargin.unit);
    }
    if (theme.blockMargin?.unitMd) {
      root.style.setProperty("--margin-unit-md", theme.blockMargin.unitMd);
    }
    if (theme.blockMargin?.unitLg) {
      root.style.setProperty("--margin-unit-lg", theme.blockMargin.unitLg);
    }
  
    if (theme.boxFontSize?.unit) {
      root.style.setProperty("--fontsize-unit", theme.boxFontSize.unit);
    }
    if (theme.boxFontSize?.unitMd) {
      root.style.setProperty("--fontsize-unit-md", theme.boxFontSize.unitMd);
    }
    if (theme.boxFontSize?.unitLg) {
      root.style.setProperty("--fontsize-unit-lg", theme.boxFontSize.unitLg);
    }
  
    if (theme.primaryButton?.hoverBgColor) {
      root.style.setProperty("--bs-btn-primary-hover-bg", theme.primaryButton.hoverBgColor);
    }
    if (theme.primaryButton?.hoverBorderColor) {
      root.style.setProperty("--bs-btn-primary-hover-border-color", theme.primaryButton.hoverBorderColor);
    }
  
    if (theme.secondaryButton?.hoverBgColor) {
      root.style.setProperty("--bs-btn-secondary-hover-bg", theme.secondaryButton.hoverBgColor);
    }
    if (theme.secondaryButton?.hoverBorderColor) {
      root.style.setProperty("--bs-btn-secondary-hover-border-color", theme.secondaryButton.hoverBorderColor);
    }
  
    localStorage.setItem("theme", JSON.stringify(theme));
  }


export function convertHexToRgb(hex: string) {
    hex = hex.replace('#', '');
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `${r},${g},${b}`;
  }
  
  export function convertHexToRgba(hex: string, opacity: number) {
    const rgb = convertHexToRgb(hex);
    return `rgba(${rgb},${opacity})`;
  }

  export const isZeroObjectID = (id: any) => {
    return !id || String(id).replaceAll('0', '') === ''
  }

export const normalizeSlug = (slug?: string): string => {
    if (!slug || slug === '/') return '/'
    return `/${slug.replace(/^\/|\/$/g, '')}`
}