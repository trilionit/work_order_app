<?php

namespace app\core;
use app\core\Database;

class Application
{
  public static string $ROOT_DIR;
  public Database $db;
  public Request $request;
  public Response $response;
  public Router $router;
  public Views $views;
  public static Application $app;

  public function __construct($rootPath, $config)
  {
    self::$ROOT_DIR = $rootPath;
    self::$app      = $this;
    $this->db       = new Database($config['db']);
    $this->request  = new Request;
    $this->response = new Response;
    $this->views    = new Views;
    $this->router   = new Router($this->request, $this->views);
  }

  public function run()
  {
    echo $this->router->resolve();
  }
}