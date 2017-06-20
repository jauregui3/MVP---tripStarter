angular.module('trip-starter')
.service('placesService', function($http, $window){
  this.search = function(callback) {
    $http({
      method: "GET",
      url: '/places'
    }).then(function success(result) {callback(result);}, function failure(result) {console.log(result.error);});
  };
});
