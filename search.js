/**
 * Created by tlindblom on 11/22/2016.
 */
Search = function(category, criteria) {
    this.time = Date.now();
    this.category = category;
    this.criteria = criteria;
    /*this.submit = function () {
        //based on those call appropriate api call function
        if (category == "Article")
            return this.fetchArticle(this.criteria);
        else if (category == "College")
            return this.fetchCollege(this.criteria);
        else if (category == "Definition")
            return this.fetchDefinition(this.criteria);

    }*/
};

Search.prototype.submit = function () {
    if (this.category == "Article")
        return this.fetchArticle(this.criteria);
    else if (this.category == "College")
        return this.fetchCollege(this.criteria);
    else if (this.category == "Definition")
        return this.fetchDefinition(this.criteria);

};

Search.prototype.fetchArticle = function (criteria) {
    var articles = [];
    $.ajax({
        url : "http://content.guardianapis.com/search?show-fields=bodyText,thumbnail&order-by=relevance&q=" + criteria.replace(" ", "%20") + "&api-key=85b6efa7-0a2a-416c-8d8b-40e8a2475e7b",
        dataType : "json",
        async: false,
        success : function(parsed_json) {
            var num_articles = 2;
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
    document.write(JSON.stringify(articles));
    return articles;
};

//var s = new Search("Article", "Hillary Clinton");
//s.submit();

Search.prototype.fetchDefinition = function (criteria) {
    /*Access word, part of speech, definition, call thesaurus api and get 5 synonyms. repeat for each word in criteria. if criteria > 5 cant do it */
    var entries = []; //holds definition objects for each word in criteria
    var words_criteria = criteria.split(", ");
        jQuery(document).ready(function($) {
            for (var k=0; k < words_criteria.length; k++) {
                entries.push(new Definition("", "", "", ""));
                $.ajax({
                    url : "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + words_criteria[k].toLowerCase() + "?key=cdd30743-539d-4551-8374-7e7f133cffa7",
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
                        alert("We couldn't find any matches for your entry " + words_criteria[k]);
                    }
                });

                $.ajax({
                    url : "http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + words_criteria[k].toLowerCase() + "?key=d63a1150-3389-489a-bd16-740157ca5250",
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


                    },
                    error:function() {
                        alert("Error");
                    }
                });
        }
        document.write(JSON.stringify(entries[0]));
            /* loop through array entries[i].word (word) entries[i].partOfSpeech.split("  ") (parts of speech) entries[i].definition.split(":")
            * entries[i].synonym.split(",") (synonym)*/
        return entries;
    });

};


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
                //alert(JSON.stringify(parsed_json));

                college.city = parsed_json.result.location.city;
                //alert(college.city);
                college.state = parsed_json.result.location.state;
                //alert(college.state);
                college.name = parsed_json.result.location.name;
                //alert(college.name);
                college.admissions = parsed_json.result.admission.acceptanceRate + "%";
                //alert(college.admissions);
                college.population = parsed_json.result.enrollment.total + " students";
                //alert(college.population);
                college.link = parsed_json.result.location.admissionsWebsite;
                //alert(college.link);

                //alert(JSON.stringify(college))

            },
            error:function() {
                alert("We can't seem to find any information about that college. Be sure to check your spelling!");
            }
        });
    });
    return college;

};
//s.fetchCollege(s.criteria);

Search.prototype.fetchWeather = function (criteria) {
    //find Two letter state code from name of city maybe another API
    var code = "CA";
    var city = "San Francisco";
    var conditions = new Weather("", "", []);
    jQuery(document).ready(function($) {
        $.ajax({
            url : "http://api.wunderground.com/api/fbdc5ee3a169b24f/geolookup/conditions/q/" + code + "/" + city.replace(" ", "_") + ".json",
            dataType : "jsonp",
            success : function(parsed_json) {
                conditions.city_name = parsed_json.location.city;
                conditions.temperature = parsed_json.current_observation.temp_f;
                conditions.current_conditions.push(parsed_json.current_observation.weather);
                conditions.current_conditions.push(parsed_json.current_observation.icon_url);

                alert(JSON.stringify(conditions));

            }
        });
    });
    return conditions;
};

Search.prototype.fetchWiki = function (criteria) {
    jQuery(document).ready(function($) {
        $.ajax({
            url : "https://en.wikipedia.org/w/api.php?action=query&titles=Radio&prop=revisions&rvprop=content&format=xml",
            dataType : "xml",
            success : function(parsed_json) {
                //alert(JSON.stringify(parsed_json));
                alert((new XMLSerializer()).serializeToString(parsed_json));

            },
            error:function() {
                alert("Error");
            }
        });
    });
};
