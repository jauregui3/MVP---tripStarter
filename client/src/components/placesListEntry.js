angular.module('trip-starter')
.component('placesListEntry', {
  templateUrl: "src/templates/placesListEntry.html",
  controller: function() {
    this.handleClick = function(country) {
      console.log(country);
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
        that.population = result.data[0].population;

        // flag
        that.flag = result.data[0].flag;

      })


    }
    this.unavailable = true;
  },
  bindings: {
    place: '<',
    countriesService: '<'
  }
});
