angular.module('trip-starter')

.component('locationSelector', {
  templateUrl: 'src/templates/locationSelector.html',
  controller: function($http) {
    this.handleClick = function() {
      var that = this;
      $http({
        method: "POST",
        url: '/place',
        data: {city: this.city, country: this.country}
      }).then(function success() {
        that.placesService.search(function(places) {
          that.resetList(places);
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
