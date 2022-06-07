<?php

namespace app\core;

class Router
{
  public Views $views;
  public Request $request;
  protected array $routes = [];
  
  public function __construct(Request $request, Views $views)
  {
    $this->request = $request;
    $this->views = $views;
  }
  
  public function get(string $path, $callback)
  {
    $this->routes['get'][$path] = $callback;
  }

  public function post(string $path, $callback)
  {
    $this->routes['post'][$path] = $callback;
  }
  /**
   * @return array
   */
  public function getRouteMap($method): array
  {
    return $this->routes[$method] ?? [];
  }

  public function getCallback()
  {
    $method = $this->request->getMethod();
    $url = $this->request->getPath();
    // Trim slashes
    $url = trim($url, '/');

    // Get all routes for current request method
    $routes = $this->getRouteMap($method);

    $routeParams = false;

    // Start iterating registed routes
    foreach ($routes as $route => $callback) {
      // Trim slashes
      $route = trim($route, '/');
      $routeNames = [];

      if (!$route) {
          continue;
      }

      // Find all route names from route and save in $routeNames
      if (preg_match_all('/\{(\w+)(:[^}]+)?}/', $route, $matches)) {
        $routeNames = $matches[1];
      }

      // Convert route name into regex pattern
      $routeRegex = "@^" . preg_replace_callback('/\{\w+(:([^}]+))?}/', fn($m) => isset($m[2]) ? "({$m[2]})" : '(\w+)', $route) . "$@";

      // Test and match current route against $routeRegex
      if (preg_match_all($routeRegex, $url, $valueMatches)) {
        $values = [];
        for ($i = 1; $i < count($valueMatches); $i++) {
            $values[] = $valueMatches[$i][0];
        }
        $routeParams = array_combine($routeNames, $values);

        $this->request->setRouteParams($routeParams);
        return $callback;
      }
    }
    return false;
  }

  public function resolve()
  {
    $path     = $this->request->getPath();
    $method   = $this->request->getMethod();
    $callback = $this->routes[$method][$path] ?? false;
    if (!$callback) {
      $callback = $this->getCallback();
      if ($callback === false) {
        // throw new NotFoundException();
        return  $this->views->renderView('404');
      }
    }
    if($callback === false) {
      Application::$app->response->setStatusCode(404);
      return  $this->views->renderView('404');
    }

    if(is_string($callback)) {
      return $this->views->renderView($callback);
    }
    
    if(is_array($callback)){
      $cb = new $callback[0];
      $callback[0] = $cb;
    }
    return call_user_func($callback, $this->request);
  }

}