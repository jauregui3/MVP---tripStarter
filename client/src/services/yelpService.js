angular.module('trip-starter')
.service('yelpService', function($http, $window){
  this.search = function(callback) {
    var url = 'https://api.yelp.com/v3/businesses/search?term=restaurant&location=tokyo';
    console.log(url);
    $http({
      method: 'GET',
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlenvoded",
        "Access-Control-Allow-Origin": '*'
      }
    }).then(function success(result) {callback(result);}, function failure(result) {console.log(result.error);});
  };
});
