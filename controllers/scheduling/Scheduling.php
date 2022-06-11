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
          'start_date' => '2022-01-12 13:44:24',
          'end_date' => '2022-01-12 13:44:24',
          'status' => 'active'
        ],
        1 => [
          'id' => 2,
          'task' => 'Renew car insurance',
          'start_date' => '2022-01-12 13:44:24',
          'end_date' => '',
          'status' => 'inactive'
        ],
        2 => [
          'id' => 3,
          'task' => 'Sign up for online course',
          'start_date' => '2022-01-12 13:44:24',
          'end_date' => '2022-10-12 13:44:24',
          'status' => 'active'
        ],
      ]
    ];
    echo \json_encode($data);
  }
}