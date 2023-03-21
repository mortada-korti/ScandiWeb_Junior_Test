<?php

namespace app\core;

class Validator
{
    private array $data = [];
    private array $errors = [];
    public static $fields = ['sku', 'name', 'price', 'productType'];

    public function validateInputs($inputs)
    {
        foreach (self::$fields as $field) {
            if (property_exists($inputs, $field)) {
                $this->data[$field] = $inputs->$field;
            } else {
                $this->addError($field, "$field is not present in data");
            }
        }

        foreach ($this->data as $key => $val) {
            $this->data[$key] = trim($val);
            if (is_null($val) || empty($val)) {
                $this->addError($key, "$key can't be empty!");
            } else {
                if ($key === "price") $this->validatePrice($key, $val);
                if ($key === "productType") $this->validateProductType($key, $val);
            }
        }
        return $this->errors;
    }

    public function validatePrice($key, $val)
    {
        if (!is_numeric($val)) {
            $this->addError($key, "$key must be a number!");
        } else {
            if (floatVal($val) <= 0) {
                $this->addError($key, "$key must be a positive number!");
            }
        }
    }

    public function validateProductType($key, $val)
    {
        $array = ['DVD', 'Book', 'Furniture'];
        if (!in_array($val, $array)) {
            $this->addError($key, "$key is unavailable!");
        }
    }

    public function validateAttributes($attributes)
    {
        if (is_null($attributes) || empty($attributes)) {
            $this->addError("productType", "Attributes can't be empty");
        } else {
            foreach ($attributes as $key => $val) {
                if (is_null($val) || empty($val)) {
                    $this->addError($key, "$key can't be empty!");
                } else {
                    if (!is_numeric($val) || floatval($val) < 0) {
                        $this->addError($key, "$key must be a positive number");
                    }
                }
            }
        }
        return $this->errors;
    }

    public function addError($key, $val)
    {
        $this->errors[$key] = $val;
    }
}
