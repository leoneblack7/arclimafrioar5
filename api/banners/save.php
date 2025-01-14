<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Verifica se o diretório de imagens existe, se não, cria
$uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/lovable-uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Recebe os dados do banner
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->image)) {
    // Remove o prefixo "data:image/..." da string base64
    $image_parts = explode(";base64,", $data->image);
    $image_base64 = base64_decode($image_parts[1]);
    
    // Gera um nome único para o arquivo
    $filename = uniqid() . '.png';
    $file = $uploadDir . $filename;
    
    // Salva a imagem
    if (file_put_contents($file, $image_base64)) {
        // Salva os dados do banner no JSON
        $bannersFile = $_SERVER['DOCUMENT_ROOT'] . '/data/banners.json';
        $bannersDir = dirname($bannersFile);
        
        if (!file_exists($bannersDir)) {
            mkdir($bannersDir, 0777, true);
        }
        
        $banners = [];
        if (file_exists($bannersFile)) {
            $banners = json_decode(file_get_contents($bannersFile), true) ?? [];
        }
        
        $banners[] = [
            'id' => uniqid('banner-'),
            'image_url' => '/lovable-uploads/' . $filename,
            'active' => true
        ];
        
        if (file_put_contents($bannersFile, json_encode($banners, JSON_PRETTY_PRINT))) {
            http_response_code(201);
            echo json_encode([
                "message" => "Banner salvo com sucesso",
                "image_url" => '/lovable-uploads/' . $filename
            ]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Não foi possível salvar os dados do banner"]);
        }
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Não foi possível salvar a imagem"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Dados incompletos"]);
}
?>