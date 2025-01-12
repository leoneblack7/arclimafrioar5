import FirecrawlApp from '@mendable/firecrawl-js';

export interface ScrapedProduct {
  title: string;
  description: string;
  images: string[];
  price: number;
  rating?: number;
  specifications?: {
    voltage?: string;
    capacity?: string;
    smartWifi?: string;
    dimensions?: string;
    warranty?: string;
    [key: string]: string | undefined;
  };
}

interface ScrapeSelectors {
  h1: string[];
  description: string[];
  productImages: { src: string }[];
  productPrice: string[];
  productRating: string[];
  productSpecs: { text: string }[];
}

interface CustomCrawlOptions {
  formats: string[];
  selectors: {
    [key: string]: string | { selector: string; attribute: string };
  };
}

export class ProductScraperService {
  private static API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY || '';
  private static firecrawl = new FirecrawlApp({ apiKey: ProductScraperService.API_KEY });

  static async scrapeProduct(url: string): Promise<ScrapedProduct | null> {
    try {
      console.log('Starting product scrape:', url);
      
      const response = await this.firecrawl.crawlUrl(url, {
        limit: 1,
        scrapeOptions: {
          formats: ['html'],
          selectors: {
            'h1': 'h1',
            'description': '.product-description, .description',
            'productImages': {
              selector: '.product-images img, .product-gallery img',
              attribute: 'src'
            },
            'productPrice': '.product-price, .price-current',
            'productRating': '.rating-stars',
            'productSpecs': '.specifications-table tr, .specs-table tr'
          }
        } as CustomCrawlOptions
      });

      if (!response.success) {
        throw new Error('Failed to scrape product');
      }

      const data = response.data[0] as unknown as { selectors: ScrapeSelectors };
      if (!data) {
        throw new Error('No data returned from scrape');
      }

      const selectors = data.selectors;

      const specifications: { [key: string]: string } = {};
      const rawSpecs = selectors.productSpecs || [];
      rawSpecs.forEach((spec) => {
        const [label, value] = spec.text.split(':').map(s => s.trim());
        if (label && value) {
          specifications[label] = value;
        }
      });

      const priceText = (selectors.productPrice[0] || '0').replace(/[^\d,]/g, '').replace(',', '.') || '0';
      const price = parseFloat(priceText);

      return {
        title: selectors.h1[0] || '',
        description: selectors.description[0] || '',
        images: selectors.productImages.map(img => img.src),
        price: isNaN(price) ? 0 : price,
        rating: parseFloat(selectors.productRating[0]) || 5,
        specifications
      };
    } catch (error) {
      console.error('Error scraping product:', error);
      return null;
    }
  }
}