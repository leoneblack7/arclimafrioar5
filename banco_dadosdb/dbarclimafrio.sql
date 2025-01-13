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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserindo alguns produtos de exemplo
INSERT INTO `products` (`title`, `price`, `image`, `description`, `active`) VALUES
('Ar Condicionado Split Hi Wall 9.000 BTUs', 1999.90, 'https://example.com/ac1.jpg', 'Ar condicionado Split com 9.000 BTUs, ideal para ambientes de até 15m².', 1),
('Ar Condicionado Split Inverter 12.000 BTUs', 2499.90, 'https://example.com/ac2.jpg', 'Ar condicionado Split Inverter com 12.000 BTUs, ideal para ambientes de até 20m².', 1),
('Ar Condicionado Portátil 10.000 BTUs', 1599.90, 'https://example.com/ac3.jpg', 'Ar condicionado portátil com 10.000 BTUs, fácil de transportar.', 1);

COMMIT;