angular.module('trip-starter')
.component('placesListEntry', {
  templateUrl: "src/templates/placesListEntry.html",
  controller: function($http) {
    this.handleClick = function(city, country) {
      var that = this;
      this.unavailable = !this.unavailable;
      this.countriesService.search(country, function(result) {
        console.log(result);
        // currencies
        var currencies = result.data[0].currencies;
        that.currencies = currencies.map(function(currency) {
          return currency.name
        }).join(', ')

        // languages
        var languages = result.data[0].languages;
        that.languages = languages.map(function(language) {
          return language.name
        }).join(', ')

        // time zones
        that.timeZones = result.data[0].timezones.join(', ');

        //population
        that.population = result.data[0].population.toLocaleString();

        // flag
        that.flag = result.data[0].flag;

      });
      // load notes on click
      that.notesService.search(city, function(notes) {
        that.notes = notes.data;
      });

      // attempt at yelp api
      $http({
        method: "GET",
        url: '/yelp',
        params: {city: city, country: country}
      }).then(function success(result) {
        console.log(result);
        that.yelpRestaurants = result;
        },
        function failure(result) {
          console.log(result.error);
        });

    }

    this.submit = function(city) {
      var that = this;
      $http({
        method: "POST",
        url: '/notes',
        data: {
          note: this.input,
          city: city
        }
      }).then(function success() {
        that.notesService.search(city, function(notes) {
          console.log(notes.data)
          that.notes = notes.data;
        });
        console.log('success!');
      },
      function failure(error) {
        console.log(error);
      });
      this.input = '';
    };

    this.unavailable = true;
  },
  bindings: {
    place: '<',
    countriesService: '<',
    notesService: '<',
    resetNotes: '<'
  }
});
