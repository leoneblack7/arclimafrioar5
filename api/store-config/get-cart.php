<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$cartFile = __DIR__ . '/../../data/cart.json';

if (file_exists($cartFile)) {
    $cartData = json_decode(file_get_contents($cartFile), true);
    http_response_code(200);
    echo json_encode(array("cart_data" => $cartData));
} else {
    file_put_contents($cartFile, '[]');
    http_response_code(200);
    echo json_encode(array("cart_data" => []));
}
?>