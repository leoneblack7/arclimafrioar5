<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$conn = getConnection();

if (!$conn) {
    http_response_code(500);
    echo json_encode(array("message" => "Database connection failed."));
    exit();
}

$query = "SELECT cart_data FROM store_config WHERE id = 1";
$result = $conn->query($query);

if ($result === false) {
    http_response_code(500);
    echo json_encode(array("message" => "Query failed: " . $conn->error));
    $conn->close();
    exit();
}

if ($result->num_rows > 0) {
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
        http_response_code(500);
        echo json_encode(array("message" => "Failed to initialize cart: " . $conn->error));
    }
}

$conn->close();
?>