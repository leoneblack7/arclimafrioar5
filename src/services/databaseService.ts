import { db } from '../config/database';

export const DatabaseService = {
  async initDatabase() {
    try {
      // Create products table
      await db.query(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          description TEXT,
          image VARCHAR(255),
          images JSON,
          active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create orders table
      await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(36) PRIMARY KEY,
          customer_data JSON,
          items JSON,
          total_amount DECIMAL(10,2) NOT NULL,
          payment_method VARCHAR(50),
          status VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Database tables created successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  },

  async getProducts() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  },

  async saveProduct(product: any) {
    const { title, price, description, image, images, active } = product;
    const [result] = await db.query(
      'INSERT INTO products (title, price, description, image, images, active) VALUES (?, ?, ?, ?, ?, ?)',
      [title, price, description, image, JSON.stringify(images), active]
    );
    return result;
  },

  async getOrders() {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    return rows;
  },

  async saveOrder(order: any) {
    const { id, customer_data, items, total_amount, payment_method, status } = order;
    const [result] = await db.query(
      'INSERT INTO orders (id, customer_data, items, total_amount, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
      [id, JSON.stringify(customer_data), JSON.stringify(items), total_amount, payment_method, status]
    );
    return result;
  }
};