import FirecrawlApp from '@mendable/firecrawl-js';
import { toast } from "sonner";

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
          selectors: {
            title: 'h1',
            description: '.product-description, .description',
            images: {
              selector: '.product-images img, .product-gallery img',
              attr: 'src'
            },
            price: '.product-price, .price-current',
            rating: '.rating-stars',
            specifications: {
              selector: '.specifications-table tr, .specs-table tr',
              list: true,
              data: {
                label: 'th, td:first-child',
                value: 'td:last-child'
              }
            }
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

      // Type assertion for the scraped data
      const scrapedData = data as any;
      
      // Process specifications into a structured object
      const specifications: { [key: string]: string } = {};
      if (Array.isArray(scrapedData.specifications)) {
        scrapedData.specifications.forEach((spec: { label: string; value: string }) => {
          if (spec.label && spec.value) {
            specifications[spec.label.trim()] = spec.value.trim();
          }
        });
      }

      // Extract price from string and convert to number
      const priceString = scrapedData.price?.replace(/[^\d,]/g, '').replace(',', '.') || '0';
      const price = parseFloat(priceString);

      return {
        title: scrapedData.title || '',
        description: scrapedData.description || '',
        images: Array.isArray(scrapedData.images) ? scrapedData.images : [],
        price: isNaN(price) ? 0 : price,
        rating: typeof scrapedData.rating === 'number' ? scrapedData.rating : 5,
        specifications
      };
    } catch (error) {
      console.error('Error scraping product:', error);
      toast.error("Erro ao importar produto. Verifique o link e tente novamente.");
      return null;
    }
  }
}