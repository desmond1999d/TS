export const STATIC_PATHS = ['/', '/demesnes', '/about-us', '/contacts'];

export interface SitemapProductType {
  id: number;
  hideInTree?: boolean;
  children?: SitemapProductType[];
}

export interface SitemapDemesne {
  productTypes?: SitemapProductType[];
}

export function collectPathsFromHierarchy(productTypes: SitemapProductType[]): string[] {
  const paths: string[] = [];

  for (const productType of productTypes) {
    if (productType.hideInTree) {
      continue;
    }

    const children = productType.children ?? [];
    const visibleChildren = children.filter(child => !child.hideInTree);

    if (visibleChildren.length >= 1) {
      paths.push(`/category/${productType.id}`);
      for (const child of visibleChildren) {
        paths.push(`/category/${productType.id}/subcategory/${child.id}`);
      }
    } else if (children.length >= 1) {
      paths.push(`/category/${productType.id}/subcategory/${children[0].id}`);
    } else {
      paths.push(`/category/${productType.id}`);
    }
  }

  return paths;
}

export function collectPathsFromDemesnes(demesnes: SitemapDemesne[]): string[] {
  const paths: string[] = [];

  for (const demesne of demesnes) {
    for (const productType of demesne.productTypes ?? []) {
      if (!productType.hideInTree) {
        paths.push(`/category/${productType.id}`);
      }
    }
  }

  return paths;
}

export function mergeSitemapPaths(...pathGroups: string[][]): string[] {
  const uniquePaths = new Set<string>();

  for (const paths of pathGroups) {
    for (const path of paths) {
      uniquePaths.add(path);
    }
  }

  const staticPaths = STATIC_PATHS.filter(path => uniquePaths.has(path));
  const dynamicPaths = [...uniquePaths]
    .filter(path => !STATIC_PATHS.includes(path))
    .sort();

  return [...staticPaths, ...dynamicPaths];
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderSitemapXml(publicOrigin: string, paths: string[]): string {
  const origin = publicOrigin.replace(/\/$/, '');
  const urls = paths.map(path => {
    const loc = path === '/' ? `${origin}/` : `${origin}${path}`;
    return `<url><loc>${escapeXml(loc)}</loc></url>`;
  }).join('');

  return `<?xml version='1.0' encoding='UTF-8'?><urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>${urls}</urlset>`;
}
