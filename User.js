User = function() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
            function (json) {
               //send json.ip to the DB
            }
        );
};
