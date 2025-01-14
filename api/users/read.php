<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$usersFile = __DIR__ . '/../../data/users.json';

if (file_exists($usersFile)) {
    $users = json_decode(file_get_contents($usersFile), true);
    $activeUsers = array_filter($users, function($user) {
        return $user['active'] ?? true;
    });
    
    // Remove password hash from response
    $users = array_map(function($user) {
        unset($user['password']);
        return $user;
    }, $activeUsers);
    
    echo json_encode(array_values($users));
} else {
    echo json_encode([]);
}
?>