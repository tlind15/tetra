Search = function(category, criteria) {
    var timestamp = Date.now();
    this.time = timestamp;
    this.category = category;
    this.criteria = criteria;
    this.submit = function (criteria, category) {
        //based on those call appropriate api call function
    }
};

Search.prototype.fetchArticle = function (criteria) {
    $.ajax({
        url : "http://content.guardianapis.com/search?show-fields=bodyText,thumbnail&order-by=relevance&q=trump&api-key=85b6efa7-0a2a-416c-8d8b-40e8a2475e7b",
        dataType : "json",
        async: false,
        success : function(parsed_json) {
            var num_articles = 5;
            for (var i = 0; i < num_articles; i++) {
                alert(parsed_json.response.results[i].webTitle);
                alert(parsed_json.response.results[i].webUrl);
                alert(parsed_json.response.results[i].fields.bodyText);

            }
            //sned text to DB
        }
    });
};


Search.prototype.fetchDefinition = function (criteria) {
    /*Access word, part of speech, definition, call thesaurus api and get 5 synonyms. repeat for each word in criteria. if criteria > 5 cant do it */
        jQuery(document).ready(function($) {
            var entry = new Definition("", "", "", "");
            for (var k=0; k < criteria.length; k++) {
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
                                entry.word = parsed_xml.getElementsByTagName("ew")[j].childNodes[0].nodeValue.toLowerCase(); //word
                                alert(entry.word);
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
                                        entry.partOfSpeech += " " + (parsed_xml.getElementsByTagName("fl")[j].childNodes[0].nodeValue) + " "; //create a string of all of the parts of speech separate by 2 spaces
                                        alert(entry.partOfSpeech[i]); //part of speech
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
                            entry.definition(text);
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
                            if (word !== null && word != entry.word) {
                                text += word;
                                if (i < size - 1)
                                    text += " ";
                            }
                        }
                        text = text.replace(/ *\([^)]*\) */g, ""); //removes all parentheses
                        entry.synonym.push(text);
                        alert(text);
                    } else
                        alert("We couldn't find any synonyms in our records.");

                    alert(entry.word + JSON.stringify(entry));
                },
                error:function() {
                    alert("Error");
                }
            });
        }
    });


};

var x = ["obfuscate", "associate"];
var y = ["groundhog day"];
var s = new Search("a", x);
s.fetchDefinition(s.criteria);

//s.fetchArticle(54);


Search.prototype.fetchCollege = function (criteria) {

};

Search.prototype.fetchCity = function (criteria) {

};
