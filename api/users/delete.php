<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $id = $conn->real_escape_string($data->id);
    
    $sql = "DELETE FROM users WHERE id = $id AND username != 'admin'";
    
    if ($conn->query($sql)) {
        http_response_code(200);
        echo json_encode(array("message" => "User deleted successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete user."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to delete user. No ID provided."));
}

$conn->close();