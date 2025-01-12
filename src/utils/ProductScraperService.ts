import FirecrawlApp, { FirecrawlDocument } from '@mendable/firecrawl-js';
import { toast } from "sonner";

export interface ScrapedProduct {
  title: string;
  description: string;
  images: string[];
  price: number;
  rating?: number;
}

interface CustomData {
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
}

export class ProductScraperService {
  private static API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY || '';
  private static firecrawl = new FirecrawlApp({ apiKey: ProductScraperService.API_KEY });

  static async scrapeProduct(url: string): Promise<ScrapedProduct | null> {
    try {
      console.log('Starting product scrape:', url);
      
      const response = await this.firecrawl.crawlUrl<CustomData>(url, {
        limit: 1,
        scrapeOptions: {
          selectors: {
            title: '.product-name',
            description: '.product-description',
            images: {
              selector: '.product-images img',
              attr: 'src',
              type: 'array'
            },
            price: {
              selector: '.product-price',
              type: 'number'
            },
            rating: {
              selector: '.rating-stars',
              type: 'number'
            }
          }
        }
      });

      if (!response.success) {
        throw new Error('Failed to scrape product');
      }

      const data = response.data[0];
      
      return {
        title: data.title || '',
        description: data.description || '',
        images: Array.isArray(data.images) ? data.images : [],
        price: typeof data.price === 'number' ? data.price : 0,
        rating: typeof data.rating === 'number' ? data.rating : 5
      };
    } catch (error) {
      console.error('Error scraping product:', error);
      toast.error("Erro ao importar produto. Verifique o link e tente novamente.");
      return null;
    }
  }
}