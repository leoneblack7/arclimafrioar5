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
          elements: {
            title: { selector: 'h1' },
            description: { selector: '.product-description, .description' },
            images: { selector: '.product-images img, .product-gallery img', attribute: 'src' },
            price: { selector: '.product-price, .price-current' },
            rating: { selector: '.rating-stars' },
            specs: { selector: '.specifications-table tr, .specs-table tr' }
          }
        }
      });

      if (!response.success) {
        throw new Error('Failed to scrape product');
      }

      const data = response.data[0];
      if (!data) {
        throw new Error('No data returned from scrape');
      }

      // Process specifications into a structured object
      const specifications: { [key: string]: string } = {};
      const specs = data.elements?.specs || [];
      if (Array.isArray(specs)) {
        specs.forEach((spec: { label: string; value: string }) => {
          if (spec.label && spec.value) {
            specifications[spec.label.trim()] = spec.value.trim();
          }
        });
      }

      // Extract price from string and convert to number
      const priceString = data.elements?.price?.toString().replace(/[^\d,]/g, '').replace(',', '.') || '0';
      const price = parseFloat(priceString);

      return {
        title: data.elements?.title?.toString() || '',
        description: data.elements?.description?.toString() || '',
        images: Array.isArray(data.elements?.images) ? data.elements.images : [],
        price: isNaN(price) ? 0 : price,
        rating: typeof data.elements?.rating === 'number' ? data.elements.rating : 5,
        specifications
      };
    } catch (error) {
      console.error('Error scraping product:', error);
      return null;
    }
  }
}