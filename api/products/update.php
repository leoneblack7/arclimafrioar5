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
    $title = $conn->real_escape_string($data->title);
    $price = $conn->real_escape_string($data->price);
    $image = $conn->real_escape_string($data->image ?? '');
    $images = $conn->real_escape_string(json_encode($data->images ?? []));
    $description = $conn->real_escape_string($data->description ?? '');
    $specifications = $conn->real_escape_string($data->specifications ?? '');
    $is_description_active = $data->isDescriptionActive ? 1 : 0;
    $is_images_active = $data->isImagesActive ? 1 : 0;
    $is_specifications_active = $data->isSpecificationsActive ? 1 : 0;
    $active = $data->active ? 1 : 0;
    
    $sql = "UPDATE products SET 
            title = '$title',
            price = $price,
            image = '$image',
            images = '$images',
            description = '$description',
            specifications = '$specifications',
            is_description_active = $is_description_active,
            is_images_active = $is_images_active,
            is_specifications_active = $is_specifications_active,
            active = $active
            WHERE id = $id";
    
    if ($conn->query($sql)) {
        http_response_code(200);
        echo json_encode(array("message" => "Product updated successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update product."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update product. Data is incomplete."));
}

$conn->close();