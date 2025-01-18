-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS arclimafrio;
USE arclimafrio;

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
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
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
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
);

-- Tabela de configurações da loja
CREATE TABLE IF NOT EXISTS store_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logo_url VARCHAR(255),
    store_name VARCHAR(255) DEFAULT 'ArclimaFrio',
    cart_data JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp
);

-- Inserir alguns produtos de exemplo
INSERT INTO products (title, price, image, description, active) VALUES
('Ar Condicionado Split 12000 BTUs', 2499.99, 'https://example.com/ac1.jpg', 'Ar condicionado Split com tecnologia Inverter', TRUE),
('Ar Condicionado Portátil 9000 BTUs', 1899.99, 'https://example.com/ac2.jpg', 'Ar condicionado portátil ideal para pequenos ambientes', TRUE);

-- Inserir configuração inicial da loja
INSERT INTO store_config (store_name, logo_url) VALUES
('ArclimaFrio', 'https://example.com/logo.png');