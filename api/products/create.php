<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$productsFile = __DIR__ . '/../../data/products.json';

if (!file_exists($productsFile)) {
    file_put_contents($productsFile, '[]');
}

if (!empty($data->title) && !empty($data->price)) {
    $products = json_decode(file_get_contents($productsFile), true);
    
    // Handle image upload if present
    if (!empty($data->image) && strpos($data->image, 'data:image') === 0) {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data->image));
        $imageName = uniqid() . '.png';
        $imagePath = __DIR__ . '/../../public/lovable-uploads/' . $imageName;
        file_put_contents($imagePath, $imageData);
        $data->image = '/lovable-uploads/' . $imageName;
    }

    // Handle multiple images
    if (!empty($data->images)) {
        $processedImages = [];
        foreach ($data->images as $image) {
            if (strpos($image, 'data:image') === 0) {
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));
                $imageName = uniqid() . '.png';
                $imagePath = __DIR__ . '/../../public/lovable-uploads/' . $imageName;
                file_put_contents($imagePath, $imageData);
                $processedImages[] = '/lovable-uploads/' . $imageName;
            } else {
                $processedImages[] = $image;
            }
        }
        $data->images = $processedImages;
    }

    $newProduct = [
        'id' => time(),
        'title' => $data->title,
        'price' => $data->price,
        'image' => $data->image ?? '',
        'images' => $data->images ?? [],
        'description' => $data->description ?? '',
        'specifications' => $data->specifications ?? '',
        'active' => true,
        'created_at' => date('Y-m-d H:i:s')
    ];

    $products[] = $newProduct;
    
    if (file_put_contents($productsFile, json_encode($products, JSON_PRETTY_PRINT))) {
        http_response_code(201);
        echo json_encode(["message" => "Product created successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to create product."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to create product. Data is incomplete."]);
}
?>