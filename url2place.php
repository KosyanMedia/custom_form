<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Request-Method: *');
header('Content-type: application/x-javascript; charset=utf-8');
//$memcached = new Memcached();
//$memcached->addServer('localhost', 11211);

$url = $_GET['url'] ? rawurldecode($_GET['url']) : 'default';
$host = $_GET['host'] ? $_GET['host'] : 'default';
$callback = isset($_GET['callback']) ? $_GET['callback'] : 'aviasales_run_widget';

$file_name = './files/url2place/' . basename($host) . '.json';
if (!is_file($file_name)) {
    die($callback . '(false)');
}
function cache_key($param)
{
    return md5($param);
}

$key = cache_key($file_name);
$url_places = false;//$memcached->get($key);


if (!$url_places) {
    $url_places = json_decode(file_get_contents($file_name), true);
    //$memcached->set($key, $url_places);
}
$data_to_send = array_key_exists($url, $url_places) ? $url_places[$url] : $url_places['default'];

echo $callback . '(' . json_encode($data_to_send) . ');';

