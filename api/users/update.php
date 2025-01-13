<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $id = $conn->real_escape_string($data->id);
    $username = $conn->real_escape_string($data->username);
    $role = $conn->real_escape_string($data->role);
    $active = $data->active ? 1 : 0;
    
    $sql = "UPDATE users SET 
            username = '$username',
            role = '$role',
            active = $active
            WHERE id = $id AND username != 'admin'";
    
    if ($conn->query($sql)) {
        http_response_code(200);
        echo json_encode(array("message" => "User updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update user."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update user. Data is incomplete."));
}

$conn->close();