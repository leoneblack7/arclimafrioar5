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
        
        // Atualiza o banner com o ID especificado
        $banners = array_map(function($banner) use ($data) {
            if ($banner['id'] === $data->id) {
                if (isset($data->active)) {
                    $banner['active'] = $data->active;
                }
                if (isset($data->image_url)) {
                    $banner['image_url'] = $data->image_url;
                }
            }
            return $banner;
        }, $banners);
        
        if (file_put_contents($bannersFile, json_encode($banners, JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(["message" => "Banner atualizado com sucesso"]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível atualizar o banner"]);
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