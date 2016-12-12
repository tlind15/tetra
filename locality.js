Weather = function (city_name, temperature, current_conditions) {
    this.city_name = city_name;
    this.temperature = temperature;
    this.current_conditions = current_conditions;
};

Weather.prototype.display = function () {
    //decide how to display
};

Locality = function (city, state, country) {
    this.city = city;
    this.state = state;
    this.country = country;
};

College = function (city, state, country, name, admissions, population, link) {
    Locality.call(this, city, state, country);
    this.name = name;
    this.admissions = admissions;
    this.population = population;
    this.link = link;

};
College.prototype = Object.create(Locality.prototype);
College.prototype.constructor = College;

College.prototype.fetchWeather = function (criteria, code) {
    //find Two letter state code from name of city maybe another API
    code = "CA";
    var city = "San Francisco";
    var conditions = new Weather("", "", []);
    $.ajax({
        url : "http://api.wunderground.com/api/fbdc5ee3a169b24f/geolookup/conditions/q/" + code + "/" + city.replace(" ", "_") + ".json",
        dataType : "json",
        async : false,
        success : function(parsed_json) {
            conditions.city_name = parsed_json.location.city;
            conditions.temperature = parsed_json.current_observation.temp_f;
            conditions.current_conditions.push(parsed_json.current_observation.weather);
            conditions.current_conditions.push(parsed_json.current_observation.icon_url);

            document.write(JSON.stringify(conditions));

        }
    });
    return conditions;
};


