<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $statsFile = $_SERVER['DOCUMENT_ROOT'] . '/data/stats.json';
    
    if (file_exists($statsFile)) {
        $stats = json_decode(file_get_contents($statsFile), true) ?? [];
        
        // Atualiza a estatística com o ID especificado
        $stats = array_map(function($stat) use ($data) {
            if ($stat['id'] === $data->id) {
                $stat['value'] = $data->value;
            }
            return $stat;
        }, $stats);
        
        if (file_put_contents($statsFile, json_encode($stats, JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(["message" => "Estatística atualizada com sucesso"]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível atualizar a estatística"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Arquivo de estatísticas não encontrado"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Dados incompletos"]);
}
?>