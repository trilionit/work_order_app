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
    header("Access-Control-Allow-Origin: *");
    $posts = $request->getBody();
    print_r($posts);
  }

  public function getSchedule()
  {
    $data = [
      'data' => [
        0 => [
          'id' => 1,
          'task' => 'Buy groceries for next week',
          'created_at' => '28th Jun 2020'
        ],
        1 => [
          'id' => 2,
          'task' => 'Renew car insurance',
          'created_at' => '20th Jul 2020'
        ],
        2 => [
          'id' => 3,
          'task' => 'Sign up for online course',
          'created_at' => '1st Oct 2020'
        ],
      ]
    ];
    echo \json_encode($data);
  }
}