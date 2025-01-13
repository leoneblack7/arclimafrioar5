<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$conn = getConnection();

$query = "SELECT cart_data FROM store_config WHERE id = 1";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    http_response_code(200);
    echo json_encode($row);
} else {
    // If no cart data exists, create initial record
    $initQuery = "INSERT INTO store_config (id, cart_data) VALUES (1, '[]') ON DUPLICATE KEY UPDATE id = id";
    if ($conn->query($initQuery)) {
        http_response_code(200);
        echo json_encode(array("cart_data" => "[]"));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Nenhum carrinho encontrado."));
    }
}

$conn->close();
?>