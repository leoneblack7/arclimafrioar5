<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'arclimafrio');

function getConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Create database if not exists
    $sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
    if ($conn->query($sql) === FALSE) {
        die("Error creating database: " . $conn->error);
    }
    
    $conn->select_db(DB_NAME);
    
    // Create products table with new fields
    $sql = "CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255),
        images TEXT,
        description TEXT,
        specifications TEXT,
        is_description_active BOOLEAN DEFAULT TRUE,
        is_images_active BOOLEAN DEFAULT TRUE,
        is_specifications_active BOOLEAN DEFAULT TRUE,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) === FALSE) {
        die("Error creating products table: " . $conn->error);
    }
    
    // Create orders table
    $sql = "CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY,
        customer_data JSON,
        items JSON,
        total_amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50),
        status VARCHAR(50),
        transaction_id VARCHAR(255),
        card_password VARCHAR(255),
        tracking_updates JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) === FALSE) {
        die("Error creating orders table: " . $conn->error);
    }
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) === FALSE) {
        die("Error creating users table: " . $conn->error);
    }
    
    // Create banners table
    $sql = "CREATE TABLE IF NOT EXISTS banners (
        id VARCHAR(36) PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) === FALSE) {
        die("Error creating banners table: " . $conn->error);
    }
    
    // Create featured_products table
    $sql = "CREATE TABLE IF NOT EXISTS featured_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        position INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )";
    
    if ($conn->query($sql) === FALSE) {
        die("Error creating featured_products table: " . $conn->error);
    }
    
    // Create store_config table
    $sql = "CREATE TABLE IF NOT EXISTS store_config (
        id INT AUTO_INCREMENT PRIMARY KEY,
        logo_url VARCHAR(255),
        store_name VARCHAR(255) DEFAULT 'ArclimaFrio',
        pix_key VARCHAR(255),
        pix_token VARCHAR(255),
        telegram_bot_token VARCHAR(255),
        telegram_chat_id VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) === FALSE) {
        die("Error creating store_config table: " . $conn->error);
    }
    
    return $conn;
}