<?php
namespace app\controllers\scheduling;

use app\core\Request;

class Scheduling
{
  public function __construct()
  {

  }

  public function add(Request $request)
  {
    $posts = $request->getBody();
    print_r($posts);
  }
}