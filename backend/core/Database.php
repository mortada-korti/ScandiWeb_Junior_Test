<?php

namespace app\core;
use PDO;
use PDOException;


class Database
{
    public PDO $pdo;
    private string $host = HOST;
    private string $user = USER;
    private string $db   = DB;
    private string $pw   = PW;

    public function __construct()
    {
        $this->pdo = $this->connect();
    }

    public function connect()
    {
        try {
            $dsn = "mysql:localhost=$this->host;dbname=$this->db";
            $pdo = new PDO($dsn, $this->user, $this->pw);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            return $pdo;
        } catch (PDOException $e) {;
            echo $e->getMessage();
        }
    }

    public function query($sql)
    {
        $stmt = $this->pdo->prepare($sql);
        try {
            $stmt->execute();
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
}
