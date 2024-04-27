@extends('master_email')
@section('content')
<?php

$template = $template;

if(isset($data['name']) && $data['name']!= '') {
    $template = str_replace('{{name}}', $data['name'], $template);
}
if(isset($data['order_id']) && $data['order_id']!= '') {
    $template = str_replace('{{order_id}}', $data['order_id'], $template);
}
if(isset($data['email']) && $data['email']!= '') {    
    $template = str_replace('{{email}}', $data['email'], $template);
}
if(isset($data['date']) && $data['date']!= '') {    
    $template = str_replace('{{date}}', $data['date'], $template);
}    
if(isset($data['amount']) && $data['amount']!= '') {    
    $template = str_replace('{{amount}}', $data['amount'], $template);
}        
if(isset($data['link']) && $data['link']!= '') {    
    $template = str_replace('{{link}}', $data['link'], $template);
}    

echo $template;
?>
@endsection
