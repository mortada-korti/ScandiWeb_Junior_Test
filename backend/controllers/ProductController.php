<?php

namespace app\controllers;

use app\core\Request;
use app\core\Validator;
use app\models\Product;

class ProductController
{
    public function ProductList()
    {
        $products = (new Product())->getAllProducts();
        return json_encode($products);
    }

    public function ProductAdd(Request $request)
    {
        $validation = new Validator();
        $inputs = $request->get_inputs();

        $errors = $validation->validateInputs($inputs);
        if (!empty($errors)) return json_encode($errors);

        $errors = $validation->validateAttributes($inputs->attributes);
        if (!empty($errors)) return json_encode($errors);

        $model = "app\models\\" .  $inputs->productType;
        $model = new $model();
        $model->load_data($inputs);

        $result = $model->save();
        if (is_array($result)) return json_encode($result);
        return json_encode(false);
    }

    public function ProductDelete(Request $request)
    {
        $selectedProducts = $request->get_inputs();
        $result = (new Product())->deleteProduct($selectedProducts);
        return json_encode($result);
    }
}
