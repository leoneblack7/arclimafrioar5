<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$ordersFile = __DIR__ . '/../../data/orders.json';

if (file_exists($ordersFile)) {
    $orders = json_decode(file_get_contents($ordersFile), true);
    echo json_encode($orders);
} else {
    echo json_encode([]);
}
?>