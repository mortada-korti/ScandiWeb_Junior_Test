<?php

namespace app\models;

use app\core\DbModel;

class Product extends DbModel
{
    public string $sku;
    public string $name;
    public float  $price;
    public string $productType;
    public object $attributes;
    public string $attrName;
    public string $unit;
    public string $desc;
    public string $tableName = "products";

    public function __construct()
    {
        parent::__construct();
    }

    public function load_data($inputs)
    {
        foreach ($inputs as $key => $val) {
            $this->$key = $val;
        }
        $this->set_attrName($this->attrName);
        $this->set_unit($this->unit);
        $this->set_desc($this->get_attributes(), $this->get_attrName());
    }

    public function save()
    {
        return $this->insertProduct($this->get_sku(), $this->get_name(), $this->get_price(), $this->get_productType(), $this->get_desc(), $this->get_attributes());
    }


    public function get_sku()
    {
        return $this->sku;
    }
    public function get_name()
    {
        return $this->name;
    }
    public function get_price()
    {
        return $this->price;
    }
    public function get_productType()
    {
        return $this->productType;
    }
    public function get_attributes()
    {
        return $this->attributes;
    }
    public function get_desc()
    {
        return $this->desc;
    }
    public function set_desc($attributes, $attrName)
    {
        $str = ucfirst($attrName) . ": ";
        foreach ($attributes as $attribute) {
            $str .= $attribute . " " . $this->unit;
        }
        return $this->desc = $str;
    }
    public function get_unit()
    {
        return $this->unit;
    }
    public function set_unit($unit)
    {
        $this->unit = $unit;
    }
    public function get_attrName()
    {
        return $this->attrName;
    }
    public function set_attrName($attrName)
    {
        $this->attrName = $attrName;
    }
}
