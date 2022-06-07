<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require __DIR__.'/../vendor/autoload.php';

use app\core\Application;
use app\controllers\static\Pages;

$rootPath = dirname(__DIR__);
$dotenv = \Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$config = [
  'db' => [
    'host' => $_ENV['DB_HOST'],
    'dbname' => $_ENV['DB_NAME'],
    'username' => $_ENV['DB_USER'],
    'password' => $_ENV['DB_PASSWORD']
  ]
];

$app = new Application($rootPath, $config);
$Pages = new Pages;

# Static Pages
$app->router->get('/', [$Pages, 'home']);

$app->run();