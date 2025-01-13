<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->cart_data)) {
    $query = "UPDATE store_config SET 
              cart_data = :cart_data,
              updated_at = NOW()
              WHERE id = 1";

    $stmt = $db->prepare($query);
    $stmt->bindParam(":cart_data", json_encode($data->cart_data));

    if ($stmt->execute()) {
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