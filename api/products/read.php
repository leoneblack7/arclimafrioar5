<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$conn = getConnection();

$sql = "SELECT * FROM products WHERE active = 1 ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $products = array();
    while($row = $result->fetch_assoc()) {
        $row['images'] = json_decode($row['images']);
        array_push($products, $row);
    }
    echo json_encode($products);
} else {
    echo json_encode([]);
}

$conn->close();