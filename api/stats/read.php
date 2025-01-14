<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$statsFile = $_SERVER['DOCUMENT_ROOT'] . '/data/stats.json';

if (file_exists($statsFile)) {
    $stats = json_decode(file_get_contents($statsFile), true);
    if ($stats) {
        http_response_code(200);
        echo json_encode($stats);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Nenhuma estatística encontrada"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "Arquivo de estatísticas não encontrado"]);
}
?>