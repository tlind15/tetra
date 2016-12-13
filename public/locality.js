//Create weather object
Weather = function (city_name, temperature, current_conditions) {
    this.city_name = city_name;
    this.temperature = temperature;
    this.current_conditions = current_conditions;
};


College = function (city, state, name, admissions, population, link) {
    this.city = city;
    this.state = state;
    this.name = name;
    this.admissions = admissions;
    this.population = population;
    this.link = link;

};

College.prototype.fetchWeather = function (criteria, code) {
    var conditions = new Weather("", "", []);
    //***College REST API call***
    $.ajax({
        url : "http://api.wunderground.com/api/fbdc5ee3a169b24f/geolookup/conditions/q/" + code + "/" + criteria.replace(" ", "_") + ".json",
        dataType : "json",
        async : false,
        success : function(parsed_json) {
            conditions.city_name = parsed_json.location.city; //city
            
            conditions.temperature = parsed_json.current_observation.temp_f; //current temperature in farenheit 
            
            conditions.current_conditions.push(parsed_json.current_observation.weather); // current condition
            
            conditions.current_conditions.push(parsed_json.current_observation.icon_url); //condition url

        }
    });
    //******
    return conditions;
};


