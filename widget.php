<?php
header('Content-Type: text/javascript;charset=UTF-8');
header('Cache-Control: max-age=3600');
$widget_id = basename($_GET['id']);
$cached_file = './cache/' . $widget_id;
if (is_file($cached_file)){
    $data = file_get_contents($cached_file);
} else {
    $widget_url = 'http://www.travelpayouts.com/widgets/' . $widget_id .'.js';
    $data = file_get_contents($widget_url);
    file_put_contents($cached_file, $data);
}
echo $data;
