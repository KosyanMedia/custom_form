<?php
header('Content-Type: text/javascript');

$base_url = $_GET['base_url'] ? $_GET['base_url'] : 'http://www.aviasales.ru/url2place.php?callback=?';
$settings_host = $_GET['settings_host'] ? $_GET['settings_host'] : '//www.travelpayouts.com';

function get_locale_specified_widget_ids_for_host($host)
{
    $hosts = array(
        'tema.ru' => array(
            '520c55ba649ab81af600000b' => array(
                'locale' => 'ru'
            ),
            '51f0e15321c3df762800000a' => array(
                'locale' => 'en'
            )
        ),
        'oper.ru' => array(
            '51ff60a4fa6e09369600000d' => array(
                'locale' => 'ru'
            )
        ),
        'kagor' => array(
            '5257dfa7b685a770f3000008' => array(
                'locale' => 'en'
            ),
            '5257e04cb685a770f3000012' => array(
                'locale' => 'ru'
            )
        )
    );
    return $hosts[$host];
}


$widget_code = file_get_contents('./files/custom_forms/base_form.js');
$hostname = $_GET['hostname'];

$forms = get_locale_specified_widget_ids_for_host($hostname);
$search = array('%base_url%', '%settings_host%', '%forms%');
$replace = array($base_url, $settings_host, json_encode($forms));

echo str_replace($search, $replace, $widget_code);

