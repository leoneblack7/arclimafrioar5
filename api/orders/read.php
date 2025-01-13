<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$conn = getConnection();

$sql = "SELECT * FROM orders ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $orders = array();
    while($row = $result->fetch_assoc()) {
        $row['customer_data'] = json_decode($row['customer_data']);
        $row['items'] = json_decode($row['items']);
        array_push($orders, $row);
    }
    echo json_encode($orders);
} else {
    echo json_encode([]);
}

$conn->close();