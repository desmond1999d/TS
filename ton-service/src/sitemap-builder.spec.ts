import {
  STATIC_PATHS,
  collectPathsFromDemesnes,
  collectPathsFromHierarchy,
  escapeXml,
  mergeSitemapPaths,
  renderSitemapXml,
  SitemapDemesne,
  SitemapProductType,
} from '../sitemap-builder';

describe('sitemap-builder', () => {
  describe('collectPathsFromHierarchy', () => {
    it('includes category and subcategory URLs for multiple visible children', () => {
      const productTypes: SitemapProductType[] = [{
        id: 20,
        children: [
          { id: 30, hideInTree: false },
          { id: 31, hideInTree: false },
        ],
      }];

      expect(collectPathsFromHierarchy(productTypes)).toEqual([
        '/category/20',
        '/category/20/subcategory/30',
        '/category/20/subcategory/31',
      ]);
    });

    it('includes only subcategory URL when all children are hidden', () => {
      const productTypes: SitemapProductType[] = [{
        id: 25,
        children: [{ id: 55, hideInTree: true }],
      }];

      expect(collectPathsFromHierarchy(productTypes)).toEqual([
        '/category/25/subcategory/55',
      ]);
    });

    it('skips categories hidden in tree', () => {
      const productTypes: SitemapProductType[] = [{
        id: 99,
        hideInTree: true,
        children: [{ id: 100 }],
      }];

      expect(collectPathsFromHierarchy(productTypes)).toEqual([]);
    });

    it('includes category-only URL when there are no children', () => {
      const productTypes: SitemapProductType[] = [{ id: 24 }];

      expect(collectPathsFromHierarchy(productTypes)).toEqual(['/category/24']);
    });
  });

  describe('collectPathsFromDemesnes', () => {
    it('includes visible demesne category URLs', () => {
      const demesnes: SitemapDemesne[] = [{
        productTypes: [
          { id: 60, hideInTree: false },
          { id: 61, hideInTree: true },
        ],
      }];

      expect(collectPathsFromDemesnes(demesnes)).toEqual(['/category/60']);
    });
  });

  describe('mergeSitemapPaths', () => {
    it('deduplicates paths and keeps static routes first', () => {
      const merged = mergeSitemapPaths(
        STATIC_PATHS,
        ['/category/20', '/category/20/subcategory/31'],
        ['/category/20', '/category/60'],
      );

      expect(merged.slice(0, STATIC_PATHS.length)).toEqual(STATIC_PATHS);
      expect(merged).toContain('/category/20');
      expect(merged).toContain('/category/60');
      expect(merged.filter(path => path === '/category/20').length).toBe(1);
    });
  });

  describe('renderSitemapXml', () => {
    it('escapes XML and uses request origin', () => {
      const xml = renderSitemapXml('https://example.test', ['/', '/contacts']);

      expect(xml).toContain('<loc>https://example.test/</loc>');
      expect(xml).toContain('<loc>https://example.test/contacts</loc>');
    });

    it('escapes special XML characters in URLs', () => {
      const xml = renderSitemapXml('https://example.test', ['/search?q=a&b=1']);

      expect(xml).toContain(escapeXml('https://example.test/search?q=a&b=1'));
      expect(xml).not.toContain('q=a&b=1</loc>');
    });
  });
});
