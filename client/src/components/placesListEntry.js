angular.module('trip-starter')
.component('placesListEntry', {
  templateUrl: "src/templates/placesListEntry.html",
  controller: function($http) {
    this.handleClick = function(city, country) {
      var self = this;
      this.unavailable = !this.unavailable;
      this.countriesService.search(country, function(result) {

        // currencies
        var currencies = result.data[0].currencies;
        self.currencies = currencies.map(function(currency) {
          return currency.name
        }).join(', ')

        // languages
        var languages = result.data[0].languages;
        self.languages = languages.map(function(language) {
          return language.name
        }).join(', ')

        // time zones
        self.timeZones = result.data[0].timezones.join(', ');

        //population
        self.population = result.data[0].population.toLocaleString();

        // flag
        self.flag = result.data[0].flag;

      });
      // load notes on click
      self.notesService.search(city, function(notes) {
        self.notes = notes.data;
      });

      // Make GET requests to Yelp API on location click for restaurants, hotels, and attractions

      $http({
        method: "GET",
        url: '/yelp',
        params: {city: city, country: country, search: 'restaurants'}
      }).then(function success(results) {
        self.yelpRestaurants = results.data.businesses;
        },
        function failure(results) {
        });

      $http({
        method: "GET",
        url: '/yelp',
        params: {city: city, country: country, search: 'hotels'}
      }).then(function success(results) {
        self.yelpHotels = results.data.businesses;
        },
        function failure(results) {
        });

      $http({
        method: "GET",
        url: '/yelp',
        params: {city: city, country: country, search: 'attractions'}
      }).then(function success(results) {
        self.yelpAttractions = results.data.businesses;
        },
        function failure(results) {
        });


    }

    // submit note
    this.submit = function(city) {
      var self = this;
      $http({
        method: "POST",
        url: '/notes',
        data: {
          note: this.input,
          city: city
        }
      }).then(function success() {
        self.notesService.search(city, function(notes) {
          console.log(notes.data)
          self.notes = notes.data;
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
