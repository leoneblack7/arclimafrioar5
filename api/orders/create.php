<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id) &&
    !empty($data->total_amount)
) {
    $id = $conn->real_escape_string($data->id);
    $customer_data = $conn->real_escape_string(json_encode($data->customer_data));
    $items = $conn->real_escape_string(json_encode($data->items));
    $total_amount = $conn->real_escape_string($data->total_amount);
    $payment_method = $conn->real_escape_string($data->payment_method);
    $status = $conn->real_escape_string($data->status);
    $transaction_id = $conn->real_escape_string($data->transaction_id ?? '');
    
    $sql = "INSERT INTO orders (id, customer_data, items, total_amount, payment_method, status, transaction_id) 
            VALUES ('$id', '$customer_data', '$items', $total_amount, '$payment_method', '$status', '$transaction_id')";
    
    if ($conn->query($sql)) {
        http_response_code(201);
        echo json_encode(array("message" => "Order created successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create order."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create order. Data is incomplete."));
}

$conn->close();