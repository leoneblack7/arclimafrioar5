<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $bannersFile = $_SERVER['DOCUMENT_ROOT'] . '/data/banners.json';
    
    if (file_exists($bannersFile)) {
        $banners = json_decode(file_get_contents($bannersFile), true) ?? [];
        
        // Remove o banner com o ID especificado
        $banners = array_filter($banners, function($banner) use ($data) {
            return $banner['id'] !== $data->id;
        });
        
        if (file_put_contents($bannersFile, json_encode(array_values($banners), JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(["message" => "Banner removido com sucesso"]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível remover o banner"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Arquivo de banners não encontrado"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Dados incompletos"]);
}
?>