<?php

namespace app\models;

class DVD extends Product
{
    public string $attrName = "size";
    public string $unit = "MB";

    public function __construct()
    {
        parent::__construct();
    }
}
