<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$cartFile = __DIR__ . '/../../data/cart.json';

if (!empty($data->cart_data)) {
    if (file_put_contents($cartFile, json_encode($data->cart_data, JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(array("message" => "Carrinho salvo com sucesso."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Não foi possível salvar o carrinho."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Dados incompletos."));
}
?>