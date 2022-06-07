<?php

namespace app\core;

class Views
{
  public function renderView($view, $params=[])
  {
    $defaultLayout = $this->renderDefaultLayout($params);
    
    $pageView = $this->renderPageView($view, $params); 

    return str_replace('{{content}}', $pageView, $defaultLayout);
  }

  protected function renderDefaultLayout($params = [])
  {
    if(count($params) > 0) {
      foreach($params as $key => $value){
        $$key = $value;
      }
    }
    ob_start();
    include_once Application::$ROOT_DIR."/views/layout/default/index.html";
    return ob_get_clean();
  }

  protected function renderPageView($view, $params)
  {
    foreach($params as $key => $value){
      $$key = $value;
    }
    
    ob_start();
    include_once Application::$ROOT_DIR."/views/pages/$view/index.php";
    return ob_get_clean();
  }
}