import { FireCrawl } from "@mendable/firecrawl-js";

interface ScrapedProduct {
  title: string;
  price: number;
  description: string;
  images: string[];
}

export class ProductScraperService {
  static async scrapeProduct(url: string): Promise<ScrapedProduct | null> {
    try {
      const crawler = new FireCrawl();
      
      const result = await crawler.crawl({
        url,
        formats: ["content", "html"],
        extractRules: {
          title: { selector: "h1", type: "text" },
          price: { selector: ".price, .product-price", type: "text" },
          description: { selector: ".description, .product-description", type: "text" },
          images: { selector: ".product-image img", type: "attribute", attribute: "src" }
        }
      });

      if (!result.data) {
        return null;
      }

      // Clean up and format the price
      const priceString = result.data.price?.replace(/[^\d,]/g, "").replace(",", ".");
      const price = priceString ? parseFloat(priceString) : 0;

      return {
        title: result.data.title || "Produto sem título",
        price: price,
        description: result.data.description || "Sem descrição disponível",
        images: Array.isArray(result.data.images) ? result.data.images : []
      };
    } catch (error) {
      console.error("Error scraping product:", error);
      return null;
    }
  }
}