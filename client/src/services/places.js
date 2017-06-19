angular.module('trip-starter')
.service('places', function($http, $window){
  this.search = function(query, callback) {
    $http.get({
      method: "GET",
      url: '/places'
    }).then(function success({data}) {callback(data);}, function failure({data}) {console.log(data.error);});
  };
});
