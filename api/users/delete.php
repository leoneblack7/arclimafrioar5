<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$usersFile = __DIR__ . '/../../data/users.json';

if (!empty($data->id)) {
    $users = json_decode(file_get_contents($usersFile), true);
    
    // Find user index
    $index = array_search($data->id, array_column($users, 'id'));
    
    if ($index !== false) {
        // Protect admin user from deletion
        if ($users[$index]['username'] === 'admin') {
            http_response_code(403);
            echo json_encode(["message" => "Cannot delete admin user."]);
            exit;
        }
        
        // Remove user
        array_splice($users, $index, 1);
        
        if (file_put_contents($usersFile, json_encode(array_values($users), JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(["message" => "User deleted successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete user."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to delete user. No ID provided."]);
}
?>