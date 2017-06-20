angular.module('trip-starter')
.service('restCountriesService', function($http, $window){
  this.search = function(country, callback) {
    var url = 'https://restcountries.eu/rest/v2/name/' + country + '?fullText=true';
    console.log(url);
    $http.get(url).then(function success(result) {callback(result);}, function failure(result) {console.log(result.error);});
  };
});