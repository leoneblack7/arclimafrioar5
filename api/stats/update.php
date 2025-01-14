<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $statsFile = $_SERVER['DOCUMENT_ROOT'] . '/data/stats.json';
    
    // Cria o diretório data se não existir
    if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/data')) {
        mkdir($_SERVER['DOCUMENT_ROOT'] . '/data', 0777, true);
    }
    
    // Se o arquivo não existir, cria um array vazio
    if (!file_exists($statsFile)) {
        file_put_contents($statsFile, json_encode([]));
        chmod($statsFile, 0777);
    }
    
    $stats = json_decode(file_get_contents($statsFile), true) ?? [];
    
    // Procura a estatística com o ID especificado
    $found = false;
    foreach ($stats as &$stat) {
        if ($stat['id'] === $data->id) {
            $stat['value'] = $data->value;
            $found = true;
            break;
        }
    }
    
    if (file_put_contents($statsFile, json_encode($stats, JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(["message" => "Estatística atualizada com sucesso"]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Não foi possível atualizar a estatística"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Dados incompletos"]);
}
?>