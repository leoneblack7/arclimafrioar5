<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["success" => false, "message" => "Dados inválidos"]);
    exit();
}

$config = [
    "DB_HOST" => $data->host,
    "DB_PORT" => $data->port,
    "DB_DATABASE" => $data->database,
    "DB_USERNAME" => $data->username,
    "DB_PASSWORD" => $data->password
];

$envContent = "";
foreach ($config as $key => $value) {
    $envContent .= "$key=$value\n";
}

if (file_put_contents("../../.env", $envContent, FILE_APPEND)) {
    echo json_encode(["success" => true, "message" => "Configurações salvas com sucesso"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao salvar configurações"]);
}