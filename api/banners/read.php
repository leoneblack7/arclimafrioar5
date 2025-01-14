<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$bannersFile = $_SERVER['DOCUMENT_ROOT'] . '/data/banners.json';

if (file_exists($bannersFile)) {
    $banners = json_decode(file_get_contents($bannersFile), true);
    if ($banners) {
        http_response_code(200);
        echo json_encode($banners);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Nenhum banner encontrado"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "Arquivo de banners não encontrado"]);
}
?>