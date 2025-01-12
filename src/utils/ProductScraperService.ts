import FirecrawlApp from '@mendable/firecrawl-js';
import { toast } from "sonner";

export interface ScrapedProduct {
  title: string;
  description: string;
  images: string[];
  price: number;
  rating?: number;
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
          extractors: {
            title: { selector: '.product-name', type: 'text' },
            description: { selector: '.product-description', type: 'text' },
            images: { selector: '.product-images img', type: 'attribute', attribute: 'src' },
            price: { selector: '.product-price', type: 'number' },
            rating: { selector: '.rating-stars', type: 'number' }
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

      // Type assertion since we know the structure of our data
      const scrapedData = data as unknown as {
        title?: string;
        description?: string;
        images?: string[];
        price?: number;
        rating?: number;
      };

      return {
        title: scrapedData.title || '',
        description: scrapedData.description || '',
        images: Array.isArray(scrapedData.images) ? scrapedData.images : [],
        price: typeof scrapedData.price === 'number' ? scrapedData.price : 0,
        rating: typeof scrapedData.rating === 'number' ? scrapedData.rating : 5
      };
    } catch (error) {
      console.error('Error scraping product:', error);
      toast.error("Erro ao importar produto. Verifique o link e tente novamente.");
      return null;
    }
  }
}