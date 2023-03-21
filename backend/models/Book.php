<?php

namespace app\models;

class Book extends Product
{
    public string $attrName = "weight";
    public string $unit = "KG";
    
    public function __construct()
    {
        parent::__construct();
    }
}
