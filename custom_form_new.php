<?php
$server = $_SERVER['HTTP_HOST'];
header('Content-Type: text/javascript');
$search = array('%server%');
$replace = array($server);

$code = file_get_contents('./files/custom_forms/base_form.js');
echo str_replace($search, $replace, $code);



