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
        that.render.search(function(places) {
          that.reset(places);
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
    render: '<',
    reset: '<',
    places: '<'
  }

});
