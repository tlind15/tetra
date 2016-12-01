Weather = function (city_name, temperature, humidity) {
    this.city_name = city_name;
    this.temperature = temperature;
    this.humidity = humidity;
};

Weather.prototype.display = function () {
    //decide how to display
};


Restaurant = function (name, rating, cost, link) {
    this.name = name;
    this.rating = rating;
    this.cost = cost;
    this.link = link;

};

Restaurant.prototype.display = function () {
    //decide how to display
};

Locality = function (city, state, country) {
    this.city = city;
    this.state = state;
    this.country = country;
    this.weather = function () {
        //make api call
        //parse JSON
        //return Weather(....);
    };
    this.food = function () {
        //make api call
        //parse JSON
        //make a restaurant object for each option
        //return option = [...(restaurant objects)...]

    };

};


College = function (city, state, country, name, admissions, population, link) {
    Locality.call(this, city, country);
    this.name = name;
    this.admissions = admissions;
    this.population = population;
    this.link = link;
    
};
College.prototype = Object.create(Locality.prototype);
College.prototype.constructor = College;


