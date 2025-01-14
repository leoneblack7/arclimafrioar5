<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$usersFile = __DIR__ . '/../../data/users.json';

if (!empty($data->id)) {
    $users = json_decode(file_get_contents($usersFile), true);
    
    $index = array_search($data->id, array_column($users, 'id'));
    
    if ($index !== false) {
        // Don't update password if not provided
        if (!empty($data->password)) {
            $data->password = password_hash($data->password, PASSWORD_DEFAULT);
        } else {
            unset($data->password);
        }
        
        // Protect admin user from being deactivated
        if ($users[$index]['username'] === 'admin') {
            $data->active = true;
        }
        
        $users[$index] = array_merge($users[$index], (array)$data);
        
        if (file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(["message" => "User updated successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update user."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to update user. No ID provided."]);
}
?>