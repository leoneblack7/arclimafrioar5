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
          title: 'h1',
          description: '.product-description, .description',
          images: {
            selector: '.product-images img, .product-gallery img',
            attribute: 'src'
          },
          price: '.product-price, .price-current',
          rating: '.rating-stars',
          specifications: '.specifications-table tr, .specs-table tr'
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
      const rawSpecs = data.specifications || [];
      if (Array.isArray(rawSpecs)) {
        rawSpecs.forEach((spec: { text: string }) => {
          const [label, value] = spec.text.split(':').map(s => s.trim());
          if (label && value) {
            specifications[label] = value;
          }
        });
      }

      // Extract price from string and convert to number
      const priceText = (data.price as string)?.replace(/[^\d,]/g, '').replace(',', '.') || '0';
      const price = parseFloat(priceText);

      return {
        title: (data.title as string) || '',
        description: (data.description as string) || '',
        images: Array.isArray(data.images) ? data.images : [],
        price: isNaN(price) ? 0 : price,
        rating: typeof data.rating === 'number' ? data.rating : 5,
        specifications
      };
    } catch (error) {
      console.error('Error scraping product:', error);
      return null;
    }
  }
}