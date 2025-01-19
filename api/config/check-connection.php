<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'database.php';

try {
    $conn = getConnection();
    echo json_encode([
        "connected" => true,
        "message" => "Successfully connected to MySQL database"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "connected" => false,
        "message" => "Failed to connect to MySQL database: " . $e->getMessage()
    ]);
}