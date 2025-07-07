import SparkMD5 from "spark-md5";

export enum CacheKey {
  Site = "site_%s",
  SiteTemplate = "site-template_%s",
  WidgetType = "widget-type_%s",
  Translation = "translation_%s_%s_%s",
}

export function generateCacheKey(template: CacheKey, ...params: string[]) {
  let result = template as string;
  for (const param of params) {
    result = result.replace('%s', param);
  }
  return result;
}

export function parseCacheKey(key: string) {
  for (const cacheKey of Object.values(CacheKey)) {
    const regex = new RegExp(`^${cacheKey.replace(/%s/g, '(.*?)')}$`);
    const match = key.match(regex);
    if (match) {
      return { keyPattern: cacheKey, params: match.slice(1) };
    }
  }
  return { keyPattern: null, params: [] };
}

export function createEtagResource(data: any) {
  const stringifiedData = JSON.stringify(data);
  const hash = SparkMD5.hash(stringifiedData);
  return {
    etag: hash,
    data: data,
  };
}

export function parseEtagResource(resource: any) {
  const parsedResource = typeof resource === 'string' ? JSON.parse(resource) : resource;
  if (parsedResource?.etag && parsedResource?.data) {
    return {
      etag: parsedResource.etag,
      data: parsedResource.data,
    };
  }
  return { etag: null, data: null };
}
