<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$usersFile = __DIR__ . '/../../data/users.json';

if (!file_exists($usersFile)) {
    file_put_contents($usersFile, '[]');
}

if (!empty($data->username) && !empty($data->password)) {
    $users = json_decode(file_get_contents($usersFile), true);
    
    // Check if username already exists
    if (array_search($data->username, array_column($users, 'username')) !== false) {
        http_response_code(400);
        echo json_encode(["message" => "Username already exists."]);
        exit;
    }

    $newUser = [
        'id' => time(),
        'username' => $data->username,
        'password' => password_hash($data->password, PASSWORD_DEFAULT),
        'role' => $data->role ?? 'admin',
        'active' => true,
        'created_at' => date('Y-m-d H:i:s')
    ];

    $users[] = $newUser;
    
    if (file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT))) {
        http_response_code(201);
        echo json_encode(["message" => "User created successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to create user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to create user. Data is incomplete."]);
}
?>