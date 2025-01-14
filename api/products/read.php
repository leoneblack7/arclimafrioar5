<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$productsFile = __DIR__ . '/../../data/products.json';

if (file_exists($productsFile)) {
    $products = json_decode(file_get_contents($productsFile), true);
    $activeProducts = array_filter($products, function($product) {
        return $product['active'] ?? true;
    });
    echo json_encode(array_values($activeProducts));
} else {
    echo json_encode([]);
}
?>