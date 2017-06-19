angular.module('trip-starter')
.service('userService', function($http, $window){
  this.search = function(callback) {
    $http.get({
      method: "GET",
      url: '/user'
    }).then(function success({dataValues}) {callback(dataValues);}, function failure({dataValues}) {console.log('in the failure section', data.error);});
  };
});