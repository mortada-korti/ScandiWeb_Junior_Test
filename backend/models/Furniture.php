<?php

namespace app\models;

class Furniture extends Product
{
    public string $attrName = "dimensions";
    public string $unit = "CM";

    public function __construct()
    {
        parent::__construct();
    }

    public function set_desc($attributes, $attrName)
    {
        $str =  ucfirst($attrName) . ": ";
        foreach ($attributes as $attribute) {
            $str .= $attribute . "x";
        }
        $this->desc = rtrim($str, "x") . " " . $this->unit;
    }
}
