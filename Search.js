earch = function(category, criteria) {
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
        url : "https://newsapi.org/v1/articles?source=techcrunch&apiKey=fafa607d11c049fbb595f727ca23d65b",
        dataType : "json",
        async: false,
        success : function(parsed_json) {
            var url = parsed_json.articles[0].url;
            document.write(url);
            var description = parsed_json.articles[0].description;
            alert(description);

        }
    });
};


Search.prototype.fetchDefinition = function (criteria) {
    /*Access word, part of speech, definition, call theasaurus apiand get 5 synonyms. repeat for each word in criteria. if criteria > 5 cant do it */
    var words = ["despair"];
    for (var k=0; k < words.length; k++) {
        $.ajax({
            url : "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + words[k] + "?key=cdd30743-539d-4551-8374-7e7f133cffa7",
            dataType : "xml",
            async: false,
            success : function(parsed_xml) {
                //document.write((new XMLSerializer()).serializeToString(parsed_xml));
                var defs = parsed_xml.getElementsByTagName("dt");
                for (var j=0; j < defs.length; j++) {
                    if (j > 0 && parsed_xml.getElementsByTagName("ew")[j].childNodes[0].nodeValue !=
                        parsed_xml.getElementsByTagName("ew")[j-1].childNodes[0].nodeValue) {
                        break;
                    }
                    if (j == 0)
                        alert(parsed_xml.getElementsByTagName("ew")[j].childNodes[0].nodeValue); //word

                    alert(parsed_xml.getElementsByTagName("fl")[j].childNodes[0].nodeValue); //part of speech

                    var data = parsed_xml.getElementsByTagName("dt")[j].childNodes;
                    var text = "";
                    var tag = "";
                    for (var i = 0; i < data.length; i++) {
                        tag = parsed_xml.getElementsByTagName("dt")[j].childNodes[i].tagName;
                        if (tag === undefined) {
                            text += data[i].nodeValue;
                        }

                        else if (typeof(text) === 'string') {
                            if (tag == "d_link")
                                text += parsed_xml.getElementsByTagName("d_link")[j].childNodes[0].nodeValue;
                        }
                    }
                    alert(text);
                }
            },
            error:function() {
                alert("Error");
            }
        });
    }

};


Search.prototype.fetchCollege = function (criteria) {

};

Search.prototype.fetchCity = function (criteria) {

};
