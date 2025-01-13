<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT cart_data FROM store_config WHERE id = 1";
$stmt = $db->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($row);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Nenhum carrinho encontrado."));
}
?>