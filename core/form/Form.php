<?php
namespace app\core\form;

class Form
{
  public static function begin($id, $options = [])
  {
    $attributes = [];
    foreach ($options as $key => $value) {
      $attributes[] = "$key=\"$value\"";
    }
    echo sprintf('<form id="%s" method="post" action="#">', $id, implode(" ", $attributes));
    return new Form();
  }

  public static function end()
  {
    echo '</form>';
  }

  public function field($model, $attribute, string $required='', $formID='')
  {
    return new Field($model, $attribute, $required, $formID);
  }

  public function textareaField($model, $attribute, string $required='', $formID='')
  {
    return new TextareaField($model, $attribute, $required, $formID);
  }

}