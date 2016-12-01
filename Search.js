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
    var words = [];
            $.ajax({
                url : "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/despair?key=cdd30743-539d-4551-8374-7e7f133cffa7",
                dataType : "xml",
                async: false,
                success : function(parsed_xml) {
                    //document.write((new XMLSerializer()).serializeToString(parsed_xml));
                    //alert(xml2json(parsed_xml, "\t"));
                    var data = (JSON.parse(xml2json(parsed_xml, '\t')));
                    document.write(JSON.stringify(data));
                },
                error:function() {
                    alert("Error");
                }
            });

};



Search.prototype.fetchCollege = function (criteria) {

};

Search.prototype.fetchCity = function (criteria) {

};
