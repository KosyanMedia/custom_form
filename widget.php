<?php
header('Content-Type: text/javascript;charset=UTF-8');
header('Cache-Control: max-age=3600');
$widget_id = basename($_GET['id']);
$widget_url = 'http://www.travelpayouts.com/widgets/' . $widget_id .'.js';
$data = file_get_contents($widget_url);
echo $data;
