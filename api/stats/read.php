<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$statsFile = $_SERVER['DOCUMENT_ROOT'] . '/data/stats.json';

// Cria o diretório data se não existir
if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/data')) {
    mkdir($_SERVER['DOCUMENT_ROOT'] . '/data', 0777, true);
    chmod($_SERVER['DOCUMENT_ROOT'] . '/data', 0777);
}

// Se o arquivo não existir, cria um array vazio
if (!file_exists($statsFile)) {
    file_put_contents($statsFile, json_encode([]));
    chmod($statsFile, 0777);
}

$stats = json_decode(file_get_contents($statsFile), true);
if ($stats !== null) {
    http_response_code(200);
    echo json_encode($stats);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Nenhuma estatística encontrada"]);
}
?>