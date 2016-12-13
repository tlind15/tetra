var socket = io.connect();

//***Define a search object***
Search = function(category, criteria) {
    this.time = Date.now();
    this.category = category; //category is the type of search to be performed
    this.criteria = criteria; //criteria is what the system searches for
};
//******

//***Submit member function. When you press the 'search' button on the main page this function is called
Search.prototype.submit = function () {
    //***based on the category selected submit will call the appropriate fetch function
    //***toLowerCase() makes it a case insensitive string comparison
    //'===' is a strict equality comparison that forces the data types to be the same
    if (this.category.toLowerCase() === "Article".toLowerCase())
        return this.fetchArticle(this.criteria);
    else if (this.category.toLowerCase() === "College".toLowerCase())
        return this.fetchCollege(this.criteria);
    else if (this.category.toLowerCase() === "Definition".toLowerCase())
        return this.fetchDefinition(this.criteria);

};
//******

Search.prototype.fetchArticle = function (criteria) {
    //criteria is the data member from the Search object
    var articles = []; //this will hold several article objects.
    //***REST API CALL***
    // $.ajax creates a REST API call
    $.ajax({
        //url specifies where the information is getting pulled from
        //the url pattern for this API specifies that every ' ' in the search criteria be replaced by '%20'
        url : "http://content.guardianapis.com/search?show-fields=bodyText,thumbnail&order-by=relevance&q=" +
        criteria.replace(" ", "%20") + "&api-key=85b6efa7-0a2a-416c-8d8b-40e8a2475e7b",
        dataType : "json",
        async: false,
        success : function(parsed_json) { //if the server with the desired information can responds successfully
            var num_articles = 1; //this control the number of articles that will be stored in the array 'articles' and made available to the user
            for (var i = 0; i < num_articles; i++) {
                articles.push(new Article("", "", "")); //create a new Article object as defined in Article.js

                //get data from received JSON array with dot operators
                //the response attribute references all of the information in the JSON array
                // the results attribute contains many entries of information so each one must be referenced by an index
                articles[i].title = parsed_json.response.results[i].webTitle; //web title is the article titles

                articles[i].article = parsed_json.response.results[i].fields.bodyText; //body text represents the tex of the article
                //var text = parsed_json.response.results[i].fields.bodyText;
                //articles[i].article = sum({ 'corpus': text });

                articles[i].link = parsed_json.response.results[i].webUrl; //weburl is the link to the site where this article is posted
            }
        }
    });
    //******

    return articles;
};


Search.prototype.fetchDefinition = function (criteria) {
    var entries = []; //holds definition objects for each word in criteria
    var words_criteria = criteria.split(", "); //this converts user input of concatenated list of strings an array
    if (words_criteria.size > 5) //limits the user input to 5 words
        return;

    for (var k=0; k < words_criteria.length; k++) { //'k' represents each entry in words_criteria
        entries.push(new Definition("", [], [], "")); //create new Definition object as defined in Definition.js as add to entries array
        //***Definition REST API Call***
        $.ajax({
            //words_criteria[k] represents a given word from 'criteria' entered by the user
            //toLowerCase prevents the API from confusion regarding the casing of letters
            url : "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + words_criteria[k].toLowerCase() + "?key=cdd30743-539d-4551-8374-7e7f133cffa7",
            dataType : "xml", //this API returns XML and not JSON
            async: false,
            success : function(parsed_xml) { //API server responds successfully
                //parsed_xml represents the result data back by the API server
                /*getElementsByTagName("dt") creates an array containing each <dt> (some data inside) </dt>.
                 Each element includes the tags themselves and the data inside of them. The data inside often
                 includes more tags
                 childNodes are an array of references to the segments of data within each tag (a segment is everything after an opening tag up until
                 any other tag is reached).
                 nodeValue is the actual data value referenced by the childNode*/

                //the length of this array therefore represents the amount dictionary entries a given word has
                var size = parsed_xml.getElementsByTagName("dt").length;

                //***'j' is the index for a given dictionary entry***
                for (var j=0; j < size; j++) {
                    //The <ew> tag represents the dictionary word of interest
                    /*In this structure for each entry, the word may be listed. So if all of the entries were simply listed,
                     * the same word could be printed several times which is unnecessary*/

                    //***simple check if the entry has an <ew> tag***
                    if (parsed_xml.getElementsByTagName("ew")[j] !== undefined) {

                        /*Often times dictionaries have entries for similar words in the same dictionary entry. For example,
                         * 'despair' and 'self-despair' are listed together.*/
                        /*This statement checks if the current value of the <ew> tag is different than the previous value
                         (case insensitive). If the current value is different than the previous, it signals that the current
                         entry is for a related word and not the word the user originally entered. The system therefore breaks
                         and moves on to the next word in words_criteria*/
                        if (j > 0 && parsed_xml.getElementsByTagName("ew")[j].childNodes[0].nodeValue.toLowerCase() !=
                            parsed_xml.getElementsByTagName("ew")[j-1].childNodes[0].nodeValue.toLowerCase()) {
                            break;
                        }

                        if (j == 0) { //We only need to save the word value once since its the same in each iteration.
                            //The if condition above assures that this is the case

                            //childNodes[0] ensures that we get the word itself and not other info
                            //this gives the word
                            //entries[k] represents the Definition object of interest and .word assigns its 'word' attribute
                            entries[k].word = parsed_xml.getElementsByTagName("ew")[j].childNodes[0].nodeValue.toLowerCase();
                        }
                    }
                    //***end check if entry has <ew> tag***

                    //We want to get data from each <dt> </dt> tag. To shorten our references to a given tag we store it in this variable
                    var data = parsed_xml.getElementsByTagName("dt")[j].childNodes;

                    var text = ""; //this represents the definition text we obtain by combining the data from each childNode
                    var tag = ""; //this will be used to check for tags within a given <dt> </dt> tag

                    //***'i' is the index for each childNode (or segment) in the <dt> tag***
                    for (var i = 0; i < data.length; i++) {
                        /*this will return the tag name of a childNode of <dt>. If a given segment is not within another tag,
                         this will return undefined(see below)  */
                        tag = data[i].tagName;

                        /***first make sure a given child node exists. The second clause weeds out any segment that is
                         just a single whitespace or special character ***/
                        if (data[i].nodeValue !== null && data[i].nodeValue.length > 1) {

                            //the <fl> tag represents the part of speech
                            /*every definition entry in a single <dt> will share the same part of speech and thus we
                             only want to show that part of speech once */
                            if (i == 0) { //if we on the first childNode of the <dt> tag
                                if (parsed_xml.getElementsByTagName("fl")[j] !== undefined) { //make sure a part of speech is listed
                                    entries[k].partOfSpeech.push((parsed_xml.getElementsByTagName("fl")[j].childNodes[0].nodeValue)); //create a string of all of the parts of speech separate by 2 spaces
                                }
                            }
                            /*if data[i].tagName doesn't return a tagName then we know, that the node value contains the data of interest
                             and we simply add it to the text string*/
                            if (tag === undefined)
                                text += data[i].nodeValue;

                            //catching different types of tags found inside the <dt> tag
                            //typeof(tag) will either return undefined if its value is undefined or string if it has a value
                        }

                        //the data within the tag is omitted when inside the above if statement
                        //if tag is not undefined than a tag inside <dt> exists
                        //these tags have one segment so the data is referenced in childNodes[0]

                        if (typeof(tag) === 'string') {
                             if (tag == "d_link")
                                 text += parsed_xml.getElementsByTagName("d_link")[j].childNodes[0].nodeValue;
                             else if (tag == "un")
                                 text += parsed_xml.getElementsByTagName("un")[j].childNodes[0].nodeValue;
                             else if (tag == "fw")
                                 text += parsed_xml.getElementsByTagName("fw")[j].childNodes[0].nodeValue;
                        }
                    }
                    //***end looping through childNodes of data[i]

                    var index = text.substring(text.indexOf(":")+1).indexOf(":"); //weed out extra info which is typically followed by a second semi colon
                    if (index > 0) //indexOf return -1 if character not found so this check checks if string has more than one ":"
                        text = text.substring(0,index);

                    if (text !== null && text !== undefined && text.length > 0) { //if text actually holds data add to definition object
                        entries[k].definition.push(text);
                    }
                }
                //***end looping through each dictionary entry***
            },
            //***end successful server response function***

            //if the server fails to send to response for any reason
            error:function() {
                alert("We couldn't find any matches for your entry " + words_criteria[k]);
            }
        });
        //***end of definition REST API call***

        //***Thesaurus REST API Call***
        $.ajax({
            //url format the same as before but with thesaurus endpoint url
            url : "http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + words_criteria[k].toLowerCase() + "?key=d63a1150-3389-489a-bd16-740157ca5250",
            dataType : "xml",
            async: false,
            success : function(parsed_xml) { //parsed_xml represents the data response just like above
                if (parsed_xml.getElementsByTagName("syn")[0] != null) { //the <syn> tag contains a comma separated list of all the synonyms
                    var synonyms = parsed_xml.getElementsByTagName("syn")[0].childNodes; //the <syn> only contains one child node
                    var word = ""; //holds the value of the childNode for comparison
                    word = synonyms[0].nodeValue;

                    //if word has a value, we remove any junk parentheses that exists, as store it in the synonym attribute
                    if (word !== null)
                        entries[k].synonym += word.replace(/ *\([^)]*\) */g, ""); //words come in  comma separated list from API

                } else //in the parsed_xml, if the childnode of the <syn> tag has nothing or does not exist then there are no synonyms listed for that word
                    alert("We couldn't find any synonyms in our records.");

            },
            //***end of successful server response function

            error:function() {
                alert("We couldn't find any synonyms in our records.");
            }
        });
        //***end of thesaurus REST API call
    }
    //send(entries); //append category and criteria to entries object using socket.io
    return entries; //the array of definition objects
};


Search.prototype.fetchCollege = function (criteria) {
    //college search
    //logic that will convert name to a unitID
    var college = new College("", "", "", "", "", "");
    var unitid = "110662";
    var temp = {college: criteria};
    console.log(criteria);

    socket.emit('send message', temp);

    socket.on('new message', function(data){
        var unitid = data.college_id;
        var s_code = data.state;
        console.log(unitid);
        $.ajax({
            url : "https://nearbycolleges.info/api/everything/" + unitid,
            dataType : "json",
            async : true,
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
                college.conditions = college.fetchWeather(college.city, data.state);

                //college.category = "College";
                //college.criteria = criteria;

                //document.write(JSON.stringify(college));
                //return college; (do not actually need when socket is used)
            },
            error:function() {
                alert("We can't seem to find any information about that college. Be sure to check your spelling!");
            }
        });
        //$results.append('<div class = "return">'+cat_name[i]+':'+values[i]+'</div>');
    });
};
