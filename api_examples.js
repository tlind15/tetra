/*These should all work if you use Chrome and use/enable this plugin
    https://chrome.google.com/webstore/detail/cors-toggle/omcncfnpmcabckcddookmnajignpffnh?utm_source=gmail
*/




//weather
jQuery(document).ready(function($) {
    $.ajax({
        url : "http://api.wunderground.com/api/fbdc5ee3a169b24f/geolookup/conditions/q/CA/San_Francisco.json",
        dataType : "jsonp",
        async: false,
        success : function(parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            alert("Current temperature in " + location + " is: " + temp_f);

        }
    });
});

//news
jQuery(document).ready(function($) {
    $.ajax({
        url : "https://newsapi.org/v1/articles?source=techcrunch&apiKey=fafa607d11c049fbb595f727ca23d65b",
        dataType : "json",
        async: false,
        success : function(parsed_json) {
            var author = parsed_json.articles[0].description;

            if (author == null)
                alert('null');

            else
                alert(author);
        }
    });
});
//college search

jQuery(document).ready(function($) {
    $.ajax({
        url : "https://nearbycolleges.info/api/everything/200059",
        dataType : "json",
        async: false,
        success : function(parsed_json) {
            alert(JSON.stringify(parsed_json));

        },
        error:function() {
            alert("Error");
        }
    });
});


//definitions
jQuery(document).ready(function($) {
    $.ajax({
        url : "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=cdd30743-539d-4551-8374-7e7f133cffa7",
        dataType : "xml",
        async: false,
        success : function(parsed_json) {
            //alert(JSON.stringify(parsed_json));
            //alert((new XMLSerializer()).serializeToString(parsed_json));
            alert(parsed_json.getElementsByTagName("dt")[0].childNodes[0].nodeValue);

        },
        error:function() {
            alert("Error");
        }
    });
});

//wikipedia

jQuery(document).ready(function($) {
    $.ajax({
        url : "https://en.wikipedia.org/w/api.php?action=query&titles=Radio&prop=revisions&rvprop=content&format=json",
        dataType : "json",
        async: false,
        success : function(parsed_json) {
            //alert(JSON.stringify(parsed_json));
            //alert((new XMLSerializer()).serializeToString(parsed_json));
            alert(JSON.stringify(parsed_json));

        },
        error:function() {
            alert("Error");
        }
    });
});


//ip address
$.getJSON("https://api.ipify.org?format=jsonp&callback=?",
    function(json) {
        document.write("My public IP address is: ", json.ip);
        var ip = json.ip;
        alert(ip);
    }
);
