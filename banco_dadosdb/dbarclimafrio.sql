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
    is_featured BOOLEAN DEFAULT FALSE,
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
    pix_config JSON,
    pix_links_enabled BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações PIX
CREATE TABLE IF NOT EXISTS pix_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enabled BOOLEAN DEFAULT FALSE,
    use_custom_keys BOOLEAN DEFAULT FALSE,
    use_pix_pay BOOLEAN DEFAULT FALSE,
    use_pix_up BOOLEAN DEFAULT FALSE,
    maintenance BOOLEAN DEFAULT FALSE,
    ticto_api_key VARCHAR(255),
    custom_keys JSON,
    pix_pay_config JSON,
    pix_up_config JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp
);

-- Inserir configuração inicial da loja
INSERT INTO store_config (store_name, logo_url, pix_links_enabled) VALUES
('ArclimaFrio', 'https://example.com/logo.png', FALSE);

-- Inserir configuração inicial do PIX
INSERT INTO pix_config (enabled, use_custom_keys, use_pix_pay, use_pix_up, maintenance) VALUES
(FALSE, FALSE, FALSE, FALSE, FALSE);

-- Inserir usuário admin padrão (senha: admin123)
INSERT INTO users (username, password, role, active) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', TRUE);