<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->logo_url) || !empty($data->store_name)) {
    $query = "UPDATE store_config SET 
              logo_url = :logo_url,
              store_name = :store_name,
              updated_at = NOW()
              WHERE id = 1";

    $stmt = $db->prepare($query);

    $stmt->bindParam(":logo_url", $data->logo_url);
    $stmt->bindParam(":store_name", $data->store_name);

    if ($stmt->execute()) {
        if ($stmt->rowCount() === 0) {
            // Se não atualizou nenhuma linha, insere um novo registro
            $query = "INSERT INTO store_config (logo_url, store_name) VALUES (:logo_url, :store_name)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":logo_url", $data->logo_url);
            $stmt->bindParam(":store_name", $data->store_name);
            
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Configurações criadas com sucesso."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Não foi possível criar as configurações."));
            }
        } else {
            http_response_code(200);
            echo json_encode(array("message" => "Configurações atualizadas com sucesso."));
        }
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Não foi possível atualizar as configurações."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Dados incompletos."));
}
?>