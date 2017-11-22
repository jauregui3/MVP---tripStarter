angular.module('trip-starter')

.component('locationSelector', {
  templateUrl: 'src/templates/locationSelector.html',
  controller: function($http) {
    this.handleClick = function() {
      var self = this;
      $http({
        method: "POST",
        url: '/place',
        data: {city: this.city, country: this.country}
      }).then(function success() {
        self.placesService.search(function(places) {
          self.resetList(places);
        });
        console.log('success!');
      },
      function failure(error) {
        console.log(error);
      });
      this.city = '';
      this.country = '';
    };
  },
  bindings: {
    placesService: '<',
    resetList: '<',
    places: '<'
  }

});
