<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

include_once "./vendor/autoload.php";
include "./core/config.php";

use app\core\App;
use app\controllers\ProductController;

$app = new App();

$app->router->get("/api/products", [ProductController::class, "ProductList"]);
$app->router->post("/api/products/add", [ProductController::class, "ProductAdd"]);
$app->router->post("/api/products/delete", [ProductController::class, "ProductDelete"]);

$app->run();
