<?php

namespace app\core\form;

use app\core\validation;

class TextareaField extends BaseField
{
  public function __construct($model, string $attribute, string $required, string $formID)
  {
    // $this->type       = self::TYPE_TEXT;
    $this->validation = new Validation;
    $this->required   = $required;
    $this->formID     = $formID;
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
    
    return sprintf('<textarea class="form-control %s %s" rows="3" name="%s" id="%s"></textarea>',
      $form_input,
      $validate_input,
      $this->attribute,
      $this->attribute,
    );
        //print_r("You are here");
    }
}