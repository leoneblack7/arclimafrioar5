<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$ordersFile = __DIR__ . '/../../data/orders.json';

if (!file_exists($ordersFile)) {
    file_put_contents($ordersFile, '[]');
}

if (!empty($data->id) && !empty($data->total_amount)) {
    $orders = json_decode(file_get_contents($ordersFile), true);
    
    $newOrder = [
        'id' => $data->id,
        'customer_data' => $data->customer_data,
        'items' => $data->items,
        'total_amount' => $data->total_amount,
        'payment_method' => $data->payment_method,
        'status' => $data->status,
        'transaction_id' => $data->transaction_id ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];

    $orders[] = $newOrder;
    
    if (file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT))) {
        // Create TXT file for the order
        $txtContent = "PEDIDO #{$data->id}\n";
        $txtContent .= "Data: " . date('d/m/Y H:i:s') . "\n\n";
        $txtContent .= "CLIENTE\n";
        $txtContent .= "Nome: {$data->customer_data->name}\n";
        $txtContent .= "Email: {$data->customer_data->email}\n\n";
        $txtContent .= "ITENS\n";
        foreach ($data->items as $item) {
            $txtContent .= "{$item->title} - R$ {$item->price}\n";
        }
        $txtContent .= "\nTOTAL: R$ {$data->total_amount}\n";
        
        $txtFile = __DIR__ . "/../../data/orders/{$data->id}.txt";
        if (!is_dir(__DIR__ . '/../../data/orders')) {
            mkdir(__DIR__ . '/../../data/orders', 0777, true);
        }
        file_put_contents($txtFile, $txtContent);

        http_response_code(201);
        echo json_encode(["message" => "Order created successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to create order."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to create order. Data is incomplete."]);
}
?>