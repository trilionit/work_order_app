<?php

namespace app\core\form;
use app\core\Validation;


abstract class BaseField
{
  public Validation $validation;
  public string $attribute;
  public string $type;

  public function __construct($model, $validation, string $attribute, string $required)
  {
    $this->validation = $validation;
    $this->attribute  = $attribute;
    $this->required   = $required;
    $this->model      = $model;
  }

  public function __toString()
  {
    $req = '';
    if($this->required){
      $req = "<span class='req'>*</span>";
    }
    
    return sprintf('<label for="%s">%s%s</label>
      %s
      <div class="invalid-feedback" id="invalid-%s">
        %s
      </div>',
      $this->attribute,
      $this->validation->getLabel($this->model, $this->attribute),
      $req,
      $this->renderInput(),
      $this->attribute,
      $this->validation->getErrorMessage($this->model, $this->attribute)
    );
  }

    abstract public function renderInput();
}