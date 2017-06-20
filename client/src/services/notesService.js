angular.module('trip-starter')
.service('notesService', function($http, $window){
  this.search = function(city, callback) {
    $http({
      method: "GET",
      url: '/notes',
      params: {city: city},
      // data: {city: city},
    }).then(function success(result) {callback(result);}, function failure(result) {console.log(result.error);});
  };
});
