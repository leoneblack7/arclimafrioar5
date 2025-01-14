-- phpMyAdmin SQL Dump
-- Banco de dados: `arclimafrio`

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Estrutura da tabela `products`
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `specifications` text DEFAULT NULL,
  `is_description_active` tinyint(1) DEFAULT 1,
  `is_images_active` tinyint(1) DEFAULT 1,
  `is_specifications_active` tinyint(1) DEFAULT 1,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estrutura da tabela `orders`
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `customer_data` json DEFAULT NULL,
  `items` json DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `card_password` varchar(255) DEFAULT NULL,
  `tracking_updates` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estrutura da tabela `users`
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'admin',
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estrutura da tabela `banners`
CREATE TABLE `banners` (
  `id` varchar(36) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estrutura da tabela `featured_products`
CREATE TABLE `featured_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `featured_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estrutura da tabela `store_config`
CREATE TABLE `store_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logo_url` varchar(255) DEFAULT NULL,
  `store_name` varchar(255) DEFAULT 'ArclimaFrio',
  `pix_key` varchar(255) DEFAULT NULL,
  `pix_token` varchar(255) DEFAULT NULL,
  `telegram_bot_token` varchar(255) DEFAULT NULL,
  `telegram_chat_id` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserindo usuário admin padrão (senha: admin123)
INSERT INTO `users` (`username`, `password`, `role`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Inserindo alguns produtos de exemplo
INSERT INTO `products` (`title`, `price`, `image`, `description`, `active`) VALUES
('Ar Condicionado Split Hi Wall 9.000 BTUs', 1999.90, 'https://example.com/ac1.jpg', 'Ar condicionado Split com 9.000 BTUs, ideal para ambientes de até 15m².', 1),
('Ar Condicionado Split Inverter 12.000 BTUs', 2499.90, 'https://example.com/ac2.jpg', 'Ar condicionado Split Inverter com 12.000 BTUs, ideal para ambientes de até 20m².', 1),
('Ar Condicionado Portátil 10.000 BTUs', 1599.90, 'https://example.com/ac3.jpg', 'Ar condicionado portátil com 10.000 BTUs, fácil de transportar.', 1);

-- Inserindo configuração inicial da loja
INSERT INTO `store_config` (`store_name`, `logo_url`) VALUES
('ArclimaFrio', NULL);

COMMIT;