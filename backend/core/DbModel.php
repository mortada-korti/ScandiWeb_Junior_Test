<?php

namespace app\core;

use PDOException;

abstract class DbModel extends Database
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAllProducts()
    {
        $sql = "SELECT * FROM $this->tableName ORDER BY id DESC";
        $stmt = $this->pdo->prepare($sql);
        try {
            $stmt->execute();
            $result = $stmt->fetchAll();
            if (is_array($result) && count($result)) {
                return $result;
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    public function insertProduct($sku, $name, $price, $productType, $desc, $attributes)
    {
        $product_exists = $this->checkProduct($sku);
        if ($product_exists) return ['sku' => 'sku already exists in the database!'];

        $sql = "INSERT INTO $this->tableName(`sku`, `name`, `price`, `productType`, `desc`) VALUES(:sku, :name, :price, :productType, :desc)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":sku", $sku);
        $stmt->bindValue(":name", $name);
        $stmt->bindValue(":price", $price);
        $stmt->bindValue(":productType", $productType);
        $stmt->bindValue(":desc", $desc);
        $this->execute($stmt);
        $this->insertAttributes($attributes, $sku);
    }

    public function insertAttributes($attributes, $sku)
    {
        foreach ($attributes as $key => $val) {
            $sql = "INSERT INTO attributes(`name`, `value`, `unit`, `product_sku`) VALUES(:name, :value, :unit, :product_sku)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindValue(":name", $key);
            $stmt->bindValue(":value", $val);
            $stmt->bindValue(":unit", $this->unit);
            $stmt->bindValue(":product_sku", $sku);
            $this->execute($stmt);
        }
    }

    public function checkProduct($sku)
    {
        $sql = "SELECT sku FROM $this->tableName WHERE sku = :sku";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":sku", $sku);
        try {
            $stmt->execute();
            $result = $stmt->fetchAll();
            if (is_array($result) && count($result)) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function deleteProduct($selectedProducts)
    {
        $sql = "DELETE FROM $this->tableName WHERE id IN(" . implode(", ", $selectedProducts) . ")";
        $stmt = $this->pdo->prepare($sql);
        $this->execute($stmt);
    }

    public function execute($stmt)
    {
        try {
            $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
