<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $id = $conn->real_escape_string($data->id);
    $customer_data = $conn->real_escape_string(json_encode($data->customer_data));
    $status = $conn->real_escape_string($data->status);
    
    $sql = "UPDATE orders SET 
            customer_data = '$customer_data',
            status = '$status'
            WHERE id = '$id'";
    
    if ($conn->query($sql)) {
        http_response_code(200);
        echo json_encode(array("message" => "Order updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update order."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update order. Data is incomplete."));
}

$conn->close();