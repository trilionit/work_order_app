<?php
namespace app\core;
use app\core\Database;

abstract class Model extends Database
{
  // abstract public static function tableName(): string;
  private $now;
  public function __construct()
  {
    $this->now = date("Y-m-d H:i:s");
  }
  public function loadData($data)
  {
    foreach ($data as $key => $value) {
      if (property_exists($this, $key)) {
        $this->{$key} = $value;
      }
    }
  }
  public function attributes()
  {
    return [];
  }
  public function save($props)
  {
    $now = date("Y-m-d H:i:s");
    $tableName = $props['tablename'];
    $fields = $props['fields'];
    $field_keys  = array_keys($fields);
    $params = array_map(function($attr){
      return ":$attr";
    }, $field_keys);
    $stmt = parent::prepare("INSERT INTO $tableName (" . implode(",", $field_keys) . ", created_at, updated_at) 
    VALUES (" . implode(",", $params) . ", :created_at, :updated_at)");

    # BIND VALUES 
    foreach ($fields as $key => $value) {
      $stmt->bindValue(":$key", $value);
    }
    foreach ($fields as $key => $value) {
      $stmt->bindValue(":created_at", $now);
      $stmt->bindValue(":updated_at", $now);
    }
    // exe
    if($stmt->execute()){
     return true;
    }
    return [
      'error' => "Error: %s.\n". $stmt->error
    ];
  }
  public function update($props)
  {
    $now = date("Y-m-d H:i:s");
    $tableName = $props['tablename'];
    $fields      = $props['fields'];
    $field_keys  = array_keys($fields);
    $conditions  = $props['conditions'];
    $condition_keys = array_keys($conditions);

    $set = implode(", ", array_map(function($attr){
      return "$attr =:$attr";
    }, $field_keys)); 

    $where = implode(" AND ", array_map(function($attr){
      return "$attr =:$attr";
    }, $condition_keys)); 
             
    $stmt= parent::prepare("UPDATE $tableName SET $set, updated_at=:updated_at WHERE $where");
    
    # BIND VALUES 
    foreach ($fields as $key => $item) {
      $stmt->bindValue(":$key", $item);
    }
    foreach ($conditions as $index => $value) {
      $stmt->bindValue(":$index", $value);
    }
    foreach ($conditions as $index => $value) {
      $stmt->bindValue(":updated_at", $now);
    }
    // exe
    if($stmt->execute()){
      return true;
    }
    return [
      'error' => "Error: %s.\n". $stmt->error
    ];
  }
  public function delete()
  {

  }
  public function find($props)
  {
    $tableName = $props['tablename'];
    $fields = $props['conditions'];
    $orderby = "";
    if(isset($props['orderby'])){
      $orderFields = $props['orderby']['fields'];
      $order = $props['orderby']['order'];
      $orderby = "ORDER BY ". implode(", ", array_map(fn($attr) => "$attr", $orderFields))." ".$order;
    }
    $attributes = array_keys($fields);
    $where = implode(" AND ", array_map(fn($attr) => "$attr = :$attr", $attributes));
    $stmt = parent::prepare("SELECT * FROM $tableName WHERE $where $orderby");
    foreach ($fields as $key => $item) {
      $stmt->bindValue(":$key", $item);
    }
    $stmt->execute();
    return $stmt->fetchAll(\PDO::FETCH_ASSOC);
  }
  
}