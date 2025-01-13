<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = getConnection();

if (!$conn) {
    http_response_code(500);
    echo json_encode(array("message" => "Database connection failed."));
    exit();
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->cart_data)) {
    $cart_data = $conn->real_escape_string(json_encode($data->cart_data));
    
    $query = "UPDATE store_config SET 
              cart_data = '$cart_data',
              updated_at = NOW()
              WHERE id = 1";

    if ($conn->query($query)) {
        http_response_code(200);
        echo json_encode(array("message" => "Carrinho salvo com sucesso."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Não foi possível salvar o carrinho: " . $conn->error));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Dados incompletos."));
}

$conn->close();
?>