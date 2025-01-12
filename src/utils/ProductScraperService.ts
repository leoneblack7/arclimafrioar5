import FirecrawlApp from "@mendable/firecrawl-js";

interface ScrapedProduct {
  title: string;
  price: number;
  description: string;
  images: string[];
}

export class ProductScraperService {
  private static firecrawl: FirecrawlApp;

  private static initializeFirecrawl() {
    if (!this.firecrawl) {
      this.firecrawl = new FirecrawlApp({ apiKey: 'your-api-key-here' });
    }
  }

  static async scrapeProduct(url: string): Promise<ScrapedProduct | null> {
    try {
      this.initializeFirecrawl();
      
      const response = await this.firecrawl.crawlUrl(url, {
        limit: 1,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          selectors: {
            title: 'h1',
            price: '.price',
            description: '.description',
            images: 'img'
          }
        }
      });

      if (!response.success) {
        throw new Error('Failed to scrape product');
      }

      // Mock data for testing
      return {
        title: "Ar Condicionado Split",
        price: 2499.99,
        description: "Ar condicionado split 12000 BTUs",
        images: ["https://example.com/ac-image.jpg"]
      };

    } catch (error) {
      console.error('Error scraping product:', error);
      return null;
    }
  }
}