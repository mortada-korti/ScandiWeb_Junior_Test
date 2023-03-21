<?php

namespace app\core;

class Router
{
    public Request $request;
    public array $routes = [];

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function get($path, $callback)
    {
        $this->routes['get'][$path] = $callback;
    }

    public function post($path, $callback)
    {
        $this->routes['post'][$path] = $callback;
    }

    public function resolve()
    {
        $path = $this->request->get_path();
        $method = $this->request->get_method();
        $callback = $this->routes[$method][$path] ?? null;
        if (is_null($callback)) {
            return "Not Found";
        }
        if (is_array($callback)) {
            $callback[0] = new $callback[0]();
        }
        return call_user_func($callback, $this->request);
    }
}
