<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = getConnection();

// Check if specific order ID is requested
if (isset($_GET['id'])) {
    $orderId = $conn->real_escape_string($_GET['id']);
    $sql = "SELECT * FROM orders WHERE id = '$orderId'";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $order = $result->fetch_assoc();
        echo json_encode($order);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Order not found."));
    }
} else {
    // Return all orders if no specific ID is provided
    $sql = "SELECT * FROM orders ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $orders = array();
        while ($row = $result->fetch_assoc()) {
            array_push($orders, $row);
        }
        echo json_encode($orders);
    } else {
        echo json_encode(array());
    }
}

$conn->close();