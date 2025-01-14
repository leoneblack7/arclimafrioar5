<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$productsFile = __DIR__ . '/../../data/products.json';

if (!empty($data->id)) {
    $products = json_decode(file_get_contents($productsFile), true);
    
    $products = array_filter($products, function($product) use ($data) {
        return $product['id'] !== $data->id;
    });
    
    if (file_put_contents($productsFile, json_encode(array_values($products), JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(["message" => "Product deleted successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to delete product."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to delete product. No ID provided."]);
}
?>