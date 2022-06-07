<?php

namespace app\core;
// use app\core\Request;
class Validation
{
  const RULE_REQUIRED = 'required';
  const RULE_EMAIL = 'email';
  const RULE_MIN = 'min';
  const RULE_MAX = 'max';
  const RULE_MATCH = 'match';
  const RULE_UNIQUE = 'unique';

  public array $errors = [];

  public function attributes()
  {
    return [];
  }

  public function labels()
  {
    return [];
  }

  public function getLabel($model, $attribute)
  { 
    return $model->labels()[$attribute] ?? $attribute;
  }

  public function validatePostData($request, $rules)
  {
    $post = $request->getBody();
    $verify_submission = $this->recaptchaVerify($post['token']);  
    
    if($verify_submission->success){
      //validation
      $errors = $this->validate($rules, $post);
    }else{
      $errors = [
        'error' => 'unable to validate user'
      ];
      
    }
    return $errors;
  }
  public function recaptchaVerify($token)
  {

    $secret = $_ENV['SECRET_KEY'];
   // print_r($secret);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ]);
    
    $resp = json_decode(curl_exec($ch));
    curl_close($ch);
    
    return $resp;
  }

  public function validate($rules, $posts)
  {   
    foreach($rules as $attribute=>$rule){ 
      $value = $posts[$attribute];
      $ruleGuide = "";
      $checks = $rules[$attribute];
      foreach($checks as $key =>$check){
        if (strlen($value) == 0) {
          $ruleGuide = $check;
        }
        
        if ($ruleGuide === self::RULE_REQUIRED && !$value) {
          $this->addErrorByRule($attribute, self::RULE_REQUIRED);
        }
        if ($ruleGuide === self::RULE_EMAIL && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
          $this->addErrorByRule($attribute, self::RULE_EMAIL);
        }
      }
    }
    return $this->errors;
  }

  public function errorMessages()
    {
      return [
        self::RULE_REQUIRED => 'This field is required',
        self::RULE_EMAIL => 'This field must be valid email address',
        self::RULE_MIN => 'Min length of this field must be {min}',
        self::RULE_MAX => 'Max length of this field must be {max}',
        self::RULE_MATCH => 'This field must be the same as {match}',
        self::RULE_UNIQUE => 'Record with with this {field} already exists',
      ];
    }

  public function errorMessage($rule)
  {
    return $this->errorMessages()[$rule];
  }

  protected function addErrorByRule(string $attribute, string $rule, $params = [])
  {
    $params['field'] ??= $attribute;
    $errorMessage = $this->errorMessage($rule);
    foreach ($params as $key => $value) {
      $errorMessage = str_replace("{{$key}}", $value, $errorMessage);
    }
    $this->errors[$attribute][] = $errorMessage;
  }

  public function addError(string $attribute, string $message)
  {
    $this->errors[$attribute][] = $message;
  }

  public function hasError($attribute)
  {
    return $this->errors[$attribute] ?? false;
  }

  public function getFirstError($attribute)
  {
    $errors = $this->errors[$attribute] ?? [];
    return $errors[0] ?? '';
  }
  public function getErrorMessage($model, $attribute)
  {
    $error = $model->errorMessages();
    return $error[$attribute] ?? '';
  }

}