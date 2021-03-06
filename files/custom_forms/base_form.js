(function (){
  window.TP_FORM_SETTINGS = {};
  var cache_invalidator = 5;
    var base_url = 'http://%server%/url2place.php?callback=?';
  var show_widget = function (){
    $.getJSON(base_url, {
      url: document.location.pathname,
      host: document.location.host
    }).done(aviasales_run_widget);
  };

  var load_css = function (){
    var css;
    css = angular.element(document.createElement('link')).attr('rel', "stylesheet").attr('type', "text/css").attr('href', "http://www.travelpayouts.com/widgets/search-widget.css");
    return angular.element(document.getElementsByTagName('head')[0]).append(css);
  };
  var version = 2;

  var init_form = function (widget_id, element){
    var div;

    div = $('<div id="ng-app" ng-include="\'widget_container\'"></div>');
    div.data('widget-id', widget_id);
    element.append(div);

    return angular.bootstrap(div, ['SearchForm']);
  };

  var aviasales_run_widget = function (data){
    $('[data-widget]').each(function (idx, div){
      var locale = $(div).attr('lang'),
        id = $(div).data('widget');
      if (data) {
        window.TP_FORM_SETTINGS[id] = window.TP_FORM_SETTINGS[id] || {};
        window.TP_FORM_SETTINGS[id].destination_iata = data.destination_iata;
        window.TP_FORM_SETTINGS[id].destination_name = data.name[locale];
        window.TP_FORM_SETTINGS[id].hotel = {
          "name": data.destination[locale],
          "search_id": data.search_id,
          "search_type": data.search_type
        }
      }
    });
    var messages = {
        ru: '<h1 style="font-size:1.8em;text-align:left;line-height:1.5em;margin-left:20px">Поиск дешёвых авиабилетов</h1>',
        en: '<h1 style="font-size:1.8em;text-align:left;line-height:1.5em;margin-left:20px">Search and compare airfares</h1>'
    };

    $.ajax({
      dataType: "script",
      cache: true,
      url: 'http://www.travelpayouts.com/widgets/search-widget.min.js',
      success: function (){
        load_css();
        angular.module('SearchForm').run([
          '$http', '$rootScope', 'ParamsConvereter', '$rootElement', '$timeout', function ($http, $rootScope, ParamsConvereter, $rootElement, $timeout){
            var widget_id = $($rootElement).data('widget-id');
            var apply_params;
            apply_params = function (data){
                if(/start/.test(window.location.href)){
                    var lang = data.locale;
                    $timeout(function(){
                        $('[lang="' + lang + '"] .default').prepend(messages[lang]);
                    },50);
                }

              return $rootScope.widget_config = ParamsConvereter(data, widget_id);
            };

            return $http.jsonp("http://travelpayouts.com/widgets/" + widget_id + ".json?version=" + version + "&callback=JSON_CALLBACK&_" + (+new Date())).success(apply_params);
          }
        ]);

        $('[data-widget]').each(function (idx, div){
          var id = $(div).data('widget');
          init_form(id, angular.element(this));
        })
      }
    })
  };
  show_widget();
})();
