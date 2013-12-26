(function () {
    window.TP_FORM_SETTINGS = {};
    var cache_invalidator = 5;
    var base_url = 'http://%server%/url2place.php?callback=?';
    var show_widget = function () {
        $.getJSON(base_url, {
            url: document.location.pathname,
            host: document.location.host
        }).done(aviasales_run_widget);
    };
    var aviasales_run_widget = function (data) {
        $('[data-widget]').each(function (idx, div) {
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
            $.ajax({
                dataType: "script",
                cache: true,
                url: 'http://www.travelpayouts.com/widgets/' + id + '.js'
            });
        });
    };
    show_widget();
})();
