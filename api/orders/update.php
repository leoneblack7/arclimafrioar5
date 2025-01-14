<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$ordersFile = __DIR__ . '/../../data/orders.json';

if (!empty($data->id)) {
    $orders = json_decode(file_get_contents($ordersFile), true);
    
    $index = array_search($data->id, array_column($orders, 'id'));
    
    if ($index !== false) {
        $orders[$index] = array_merge($orders[$index], (array)$data);
        
        if (file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(["message" => "Order updated successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update order."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Order not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to update order. No ID provided."]);
}
?>