<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$ordersFile = __DIR__ . '/../../data/orders.json';

if (!empty($data->id)) {
    if (file_exists($ordersFile)) {
        $orders = json_decode(file_get_contents($ordersFile), true);
        $orders = array_filter($orders, function($order) use ($data) {
            return $order['id'] !== $data->id;
        });
        
        if (file_put_contents($ordersFile, json_encode(array_values($orders), JSON_PRETTY_PRINT))) {
            // Also delete the TXT file if it exists
            $txtFile = __DIR__ . "/../../data/orders/{$data->id}.txt";
            if (file_exists($txtFile)) {
                unlink($txtFile);
            }
            
            http_response_code(200);
            echo json_encode(["message" => "Order deleted successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete order."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Orders file not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to delete order. No ID provided."]);
}
?>