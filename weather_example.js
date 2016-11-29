jQuery(document).ready(function($) {
    $.ajax({
        url : "http://api.wunderground.com/api/fbdc5ee3a169b24f/geolookup/conditions/q/CA/San_Francisco.json",
        dataType : "jsonp",
        success : function(parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            alert("Current temperature in " + location + " is: " + temp_f);

        }
    });
});
