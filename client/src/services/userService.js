angular.module('trip-starter')
.service('userService', function($http, $window){
  this.search = function(callback) {
    $http({
      method: "GET",
      url: '/user'
    }).then(
      function success(result) {
        callback(result.data[0]);
      },
      function failure(result) {
        console.log('Error: ', result.error);
      });
  };
});