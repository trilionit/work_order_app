<?php

namespace app\core;

class Database
{
  private $dbname;
  private $username;
  private $password;
  private $host;
  private $port;
  public function __construct($config=[])
  {
    # TODO: Fix issue causing values to return null
    $this->dbname = $config['dbname'];
    $this->host = $config['host'];
    $this->username = $config['username'];
    $this->password = $config['password'];
    $this->port = 3306;
  }

  public function connect() 
  {
    try
    {
      $this->pdo = new \PDO("mysql:host=$this->host;port=$this->port;dbname=$this->dbname", $this->username, $this->password);
      $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    }catch(\PDOException $e) 
    {
      echo "<pre>";
      echo 'Connection Error: ' . $e->getMessage();
      echo "</pre>";
    }
    return $this->pdo;
  }
  public function prepare($sql)
  { 
    $connect = $this->connect();
    return $connect->prepare($sql);
  }

}