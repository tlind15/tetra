/**
 * Created by tlindblom on 11/22/2016.
 */
Search = function(category, criteria) {
    this.time = Date.now();
    this.category = category;
    this.criteria = criteria;
    this.submit = function (criteria, category) {
        //based on those call appropriate api call function
    }
};

Search.prototype.fetchArticle = function (criteria) {
    $.ajax({
        url : "http://content.guardianapis.com/search?show-fields=bodyText,thumbnail&order-by=relevance&q=" + criteria.replace(" ", "%20") + "&api-key=85b6efa7-0a2a-416c-8d8b-40e8a2475e7b",
        dataType : "json",
        async: false,
        success : function(parsed_json) {
            var num_articles = 2;
            var articles = [];
            for (var i = 0; i < num_articles; i++) {
                articles.push(new Article("", "", ""));

                articles[i].title = parsed_json.response.results[i].webTitle;
                alert(articles[i].title);

                articles[i].article = parsed_json.response.results[i].fields.bodyText;
                alert(articles[i].article);

                articles[i].link = parsed_json.response.results[i].webUrl;
                alert(articles[i].link);

                alert(JSON.stringify(articles[i]))
            }
            //send text to DB
        }
    });
};


Search.prototype.fetchDefinition = function (criteria) {
    /*Access word, part of speech, definition, call thesaurus api and get 5 synonyms. repeat for each word in criteria. if criteria > 5 cant do it */
        jQuery(document).ready(function($) {
            var entries = []; //holds definition objects for each word in criteria
            for (var k=0; k < criteria.length; k++) {
                entries.push(new Definition("", "", "", ""));
                $.ajax({
                    url : "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + criteria[k].toLowerCase() + "?key=cdd30743-539d-4551-8374-7e7f133cffa7",
                    dataType : "xml",
                    async: false,
                    success : function(parsed_xml) {
                        //document.write((new XMLSerializer()).serializeToString(parsed_xml));
                        var defs = parsed_xml.getElementsByTagName("dt");
                        var size = defs.length;
                        for (var j=0; j < size; j++) {

                            if (parsed_xml.getElementsByTagName("ew")[j] !== undefined) {
                                if (j > 0 && parsed_xml.getElementsByTagName("ew")[j].childNodes[0].nodeValue.toLowerCase() !=
                                    parsed_xml.getElementsByTagName("ew")[j-1].childNodes[0].nodeValue.toLowerCase()) {
                                    alert("goodbye");
                                    break;
                                }
                                if (j == 0) {
                                    entries[k].word = parsed_xml.getElementsByTagName("ew")[j].childNodes[0].nodeValue.toLowerCase(); //word
                                    alert(entries[k].word);
                                }
                            }

                            var data = parsed_xml.getElementsByTagName("dt")[j].childNodes;
                            var text = "";
                            var tag = "";
                            for (var i = 0; i < data.length; i++) {
                                tag = data[i].tagName;

                                if (data[i].nodeValue !== null && data[i].nodeValue.length > 1) {
                                    if (i == 0) {
                                        if (parsed_xml.getElementsByTagName("fl")[j] !== undefined) {
                                            entries[k].partOfSpeech += " " + (parsed_xml.getElementsByTagName("fl")[j].childNodes[0].nodeValue) + " "; //create a string of all of the parts of speech separate by 2 spaces
                                            alert(parsed_xml.getElementsByTagName("fl")[j].childNodes[0].nodeValue); //part of speech
                                        }
                                    }
                                    if (tag === undefined)
                                        text += data[i].nodeValue;

                                }
                                if (typeof(tag) === 'string') {
                                    if (tag == "d_link")
                                        text += parsed_xml.getElementsByTagName("d_link")[j].childNodes[0].nodeValue;
                                    else if (tag == "un")
                                        text += parsed_xml.getElementsByTagName("un")[j].childNodes[0].nodeValue;
                                    else if (tag == "fw")
                                        text += parsed_xml.getElementsByTagName("fw")[j].childNodes[0].nodeValue;
                                }
                            }
                            var index = text.substring(text.indexOf(":")+1).indexOf(":"); //weed out extra info which is typically followed by a second semi colon
                            if (index > 0) //indexOf return -1 if character not found so this check checks if string has more than one ":"
                                text = text.substring(0,index);
                            if (text !== null && text !== undefined && text.length > 0) {
                                alert(text);
                                entries[k].definition += " " + text + " ";
                            }
                        }
                    },
                    error:function() {
                        alert("We couldn't find any matches for your entry " + criteria[k]);
                    }
                });

                $.ajax({
                    url : "http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + criteria[k].toLowerCase() + "?key=d63a1150-3389-489a-bd16-740157ca5250",
                    dataType : "xml",
                    async: false,
                    success : function(parsed_xml) {
                        if (parsed_xml.getElementsByTagName("syn")[0] != null) {
                            var synonyms = parsed_xml.getElementsByTagName("syn")[0].childNodes;
                            var size = synonyms.length;
                            var text = "";
                            var word = "";
                            for (var i = 0; i < size; i++) {
                                word = synonyms[i].nodeValue;
                                if (word !== null && word != entries[k].word) {
                                    text += word; //words come in  comma separated list from API

                                }
                            }
                            text = text.replace(/ *\([^)]*\) */g, ""); //removes all parentheses
                            entries[k].synonym += text;
                            alert(text);
                        } else
                            alert("We couldn't find any synonyms in our records.");

                        alert(JSON.stringify(entries[k]));
                    },
                    error:function() {
                        alert("Error");
                    }
                });
        }
    });


};

//var x = ["associate", "purgatory"];
var s = new Search("a", "Hillary Clinton");
//s.fetchDefinition(s.criteria);
//s.fetchArticle(s.criteria);


Search.prototype.fetchCollege = function (criteria) {
    //college search
    //logic that will convert name to a unitID
    var college = new College("", "", "", "", "", "", "");
    var unitid = "200059";
    jQuery(document).ready(function($) {
        $.ajax({
            url : "https://nearbycolleges.info/api/everything/" + unitid,
            dataType : "json",
            success : function(parsed_json) {
                alert(JSON.stringify(parsed_json));

                college.city = parsed_json.result.location.city;
                alert(college.city);
                college.state = parsed_json.result.location.state;
                alert(college.state);
                college.name = parsed_json.result.location.name;
                alert(college.name);
                college.admissions = parsed_json.result.admission.acceptanceRate + "%";
                alert(college.admissions);
                college.population = parsed_json.result.enrollment.total + " students";
                alert(college.population);
                college.link = parsed_json.result.location.admissionsWebsite;
                alert(college.link);

                alert(JSON.stringify(college))

            },
            error:function() {
                alert("Error");
            }
        });
    });

};
//s.fetchCollege(s.criteria);

Search.prototype.fetchWeather = function (criteria) {
    //find Two letter state code from name of city maybe another API
    var code = "CA";
    var city = "San Francisco";
    jQuery(document).ready(function($) {
        $.ajax({
            url : "http://api.wunderground.com/api/fbdc5ee3a169b24f/geolookup/conditions/q/" + code + "/" + city.replace(" ", "_") + ".json",
            dataType : "jsonp",
            success : function(parsed_json) {
                var conditions = new Weather("", "", []);
                conditions.city_name = parsed_json.location.city;
                conditions.temperature = parsed_json.current_observation.temp_f;
                conditions.current_conditions.push(parsed_json.current_observation.weather);
                conditions.current_conditions.push(parsed_json.current_observation.icon_url);

                alert(JSON.stringify(conditions));

            }
        });
    });
};

s.fetchWeather(s.criteria);
