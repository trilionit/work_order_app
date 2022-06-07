<?php
namespace app\controllers\static;

use app\core\views;

class Pages extends Views
{
  public function home()
  {
    $params = [
      'page' => 'home',
    ];

    return $this->renderStaticPage($params);
  }


  protected function renderStaticPage($params)
  {
    return $this->renderView($params['page'], $params);
  }
}