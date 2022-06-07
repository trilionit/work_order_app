<?php
namespace app\core\form;
use app\core\validation;

class Field extends BaseField
{
  const TYPE_TEXT = 'text';
  const TYPE_PASSWORD = 'password';
  const TYPE_EMAIL = 'email';
  const TYPE_FILE = 'file';
  public Validation $validation;

  public function __construct($model, string $attribute, string $required, string $formID)
  {
    $this->type       = self::TYPE_TEXT;
    $this->validation = new Validation;
    $this->required   = $required;
    $this->formID = $formID;
    $this->model      = $model;
    parent::__construct($this->model, $this->validation, $attribute, $this->required, $this->formID);
  }

  public function renderInput()
  {
    $validate_input = '';
    $form_input = 'form-input';
    if(strlen($this->formID) > 0){
      $form_input = $this->formID.'-form-input';
    }
    
    if(strlen($this->required) > 0 ){
      $validate_input = $this->formID.'-validate-input';
    }
    
    return sprintf('<input type="%s" class="form-control %s %s" name="%s" id="%s">',
      $this->type,
      $form_input,
      $validate_input,
      $this->attribute,
      $this->attribute,
    );
  }

  public function emailField()
  {
    $this->type = self::TYPE_EMAIL;
    return $this;
  }

  public function passwordField()
  {
    $this->type = self::TYPE_PASSWORD;
    return $this;
  }

  public function fileField()
  {
    $this->type = self::TYPE_FILE;
    return $this;
  }
}