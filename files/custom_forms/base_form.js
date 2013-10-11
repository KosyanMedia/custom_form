$(function(){
  window.TP_FORM_SETTINGS = %forms%;
  var base_url = '%base_url%';
  var show_widget = function(){
    $.getJSON(base_url, {
      url: document.location.pathname,
      host: document.location.host
    }, aviasales_run_widget);
  };

  var aviasales_run_widget = function(data){
    $.each(window.TP_FORM_SETTINGS, function(idx, form_config){
      if(data){
        form_config.destination_iata = data.destination_iata;
        form_config.destination_name = data.name[form_config.locale];
        form_config.destination = data.name[form_config.locale];
      }
      $('<' + 'script>', {
        src: '%settings_host%/widgets/' + idx + '.js?v=1.135.0'
      }).appendTo('body');
    });

  };
  show_widget();
});
