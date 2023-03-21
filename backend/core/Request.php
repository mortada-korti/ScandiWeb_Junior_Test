<?php

namespace app\core;

class Request
{
    public string $path;
    public string $method;

    public function __construct()
    {
        $this->set_method(strtolower($_SERVER['REQUEST_METHOD']));
        $this->set_path($_SERVER['REQUEST_URI']);
    }

    public function set_path($path)
    {
        $this->path = $path;
    }
    public function get_path()
    {
        return $this->path;
    }
    public function set_method($method)
    {
        $this->method = $method;
    }
    public function get_method()
    {
        return $this->method;
    }

    public function isPost()
    {
        return $this->get_method() === "post";
    }

    public function get_inputs()
    {
        if ($this->isPost()) {
            $data = json_decode(file_get_contents("php://input"));
            return $data;
        }
    }
}
