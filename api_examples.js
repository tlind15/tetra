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

var banana = {"word":"banana","partOfSpeech":" noun ","definition":" :an elongated usually tapering tropical fruit with soft pulpy flesh enclosed in a soft usually yellow rind ","synonym":""};
var associate = {"word":"associate","partOfSpeech":"verb:adjective:noun:","definition":" :to join as a partner, friend, or companion :to keep company with :to join or connect together ","synonym":"cohort, companion, compatriot, compeer, comrade, crony, fellow, hobnobber, mate, running mate"}

var sample = "I don’t know about you, but Lost&nbsp;in Showbiz can’t get enough of anyone with lots of Twitter followers taking their personal struggles with broadband installation/tardy dishwasher delivery/carry-on baggage rules public. However self-effacingly unspoken it is,&nbsp;we know they’re out there for the&nbsp;rest of us, and even as we have to wade through a seemingly endless stream of tweets to which the handle @British_Airways or @VodafoneUK is magisterially appended like it’s the effing Bat-Signal, I think we all emerge the richer for it. They lift us all. My washing machine is because theirs is. One of the great veterans of this type of conflict is Location, Location, Location presenter Kirstie Allsopp, whose Homemade guide to Being A&nbsp;Celebrity Conservative has yet to air, but will presumably eventually be spewed out of the Great Channel 4 Format Flogger. They get around to all&nbsp;of them in the end. In one notable act of heroics, Kirstie deployed her online resources in the war on carry-on liquids. There followed a series of dispatches from the frontline, in which we learned that a transparent but zipped Anya Hindmarch makeup bag was deemed by @British_Airways to be an unsuitable cabin receptacle to encase Kirstie’s lipstick and whatnot. Why? Apparently something to do with zips being outlawed. “I did not complain,” complained Kirstie, “but I was miffed. Like thousands of working mothers, I keep a grab-and-go travel kit&nbsp;and I was shocked this was not viable any more.” Shiiiiiiiiiiiiiiiiiiiiiit! What happened? “I did not have to throw anything away,” she elaborated. “I put my makeup in a&nbsp;free bag, and my own bag in hand luggage.” Still, I hope we can agree it was all an unbelievably close shave. Alas, this week Kirstie has gone on the tweet again, but the reaction has been rather more mixed. The post in question read: “Just saw a guy have a&nbsp;glass of coke, a cappuccino, a croissant and a ham &amp; cheese sandwich for breakfast. #ourNHSistoast #worldgonemad.” Well now. #HaveYouEverHadAHangoverAndHadToGoToWork #ThenAgainWhichOfUsCanReally ExtrapolateAnythingFromAStrangersBreakfast #ExcitedForBakeOffOnC4 A completely nonscientific analysis of the replies to Kirstie’s tweet found a few sympathetic ears, but a lot of people suggesting she was smug and judgmental, or that the person might have just done a bike ride/come off a nightshift where they didn’t get a break/be hypoglycemic. “My point,” shot back Kirstie, “is that if we want a functioning NHS we all need to take a pull.” She added that she hoped it started a “national conversation”. Quite. Maybe those criticising Kirstie are simply unaware of how many of their rights and responsibilities are a direct result of national conversations started by her tweets? I think she should have simply responded to them with a version of Jack Nicholson’s dismissal of Tom Cruise in A Few Good Men: “You don’t want the truth because, deep down in places you don’t talk about at parties, you want me on that timeline, you need me on your timeline. We use words like honour, code, zips, diabetes. We use these words as the backbone of a life spent defending something. You use them as a punchline. I have neither the time nor the inclination to explain myself to a tweeter who rises and sleeps under the blanket of the very freedom that I provide, and then questions the manner in which I provide it. I would rather you just said thank you, and went on your way.” Unfortunately, the reply Kirstie did give didn’t silence the critics, so she doubled down. “We can either take a pull,” she stated, “and accept that what we eat hugely impacts our health and therefore #OurNHS, or we can stick our heads in the sand.” Of course, a small part of me does feel that if Kirstie wanted a more effective impact on the health service, perhaps she could have had a word with her friends David Cameron and George Osborne, at any point during their six years as actual prime minister and chancellor. I know that wasn’t strictly her government remit – though obviously she was put in charge of a housing review – but there is an argument that this would have been smarter than mugging off some member of the public in the latest edition of Allsopp’s Fables. Yet that would be me forgetting that Kirstie is essentially about small government. During one Today programme appearance, she was asked whether planning laws should be used to stop some villages becoming second-home ghost towns, and responded angrily in the negative, declaring: “Communities have to save themselves.” (Yes. Take a pull, former mining villages, even if the call centres have gone.) Indeed, having been reminded of that view, I suddenly discern a powerful parallel between the NHS crisis and the housing crisis. As Kirstie reminds us, everything is connected. We are all going to have to take a pull. God knows there are nights we’ve regarded getting unhealthily drunk as the preferable option to watching the endless, soul-destroying parade of property shows on TV, where&nbsp;the focus is always on the properties, as opposed to what you might deem the bigger issue, namely that there AREN’T ANYWHERE NEAR ENOUGH PROPERTIES FOR PEOPLE TO AFFORDABLY LIVE IN. #worldgonemad. So next time you see someone watching Location Location Location, or Relocation Relocation, or any of the other 12 miserable iterations of this stuff, don’t just think it’s none of your business and you aren’t remotely in possession of sufficient facts about why they’re doing it to begin to make a wider point about it. Instead, tell them that it’s an absolutely crappy lifestyle choice – not just for them, but for a nation whose housing supply is patently already at crisis point. It’s just one person’s choice, sure. But it clearly has&nbsp;an impact on wider cultural forces that are creating an ever-growing number of people who aren’t invested in property ownership, who feel increasingly angry and left behind, and are disenfranchised by&nbsp;this country’s repeatedly self-destructive obsession with property prices and endless fixation with getting a bigger kitchen out of the side return. As I say, next time you see someone watching a property show, remember that it is a bit like seeing someone eating a vitamin-free breakfast. You need to remind them that people may like this stuff – they may even find it comforting after a hard day. But it is absolutely no good for them, or the buckling wider community in which we all share, and, consequently, it&nbsp;needs to stop. In short, we all need to take a pull and switch off. It’s what Kirstie would&nbsp;want."
