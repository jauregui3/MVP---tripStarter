angular.module('trip-starter')
.service('yelpService', function($http, $window){
  this.search = function(query, callback) {
  //   $http.get('/v2/search', {
  //     params: {
  //       part: 'snippet',
  //       key: $window.YELP_API_KEY,
  //       q: query,
  //       maxResults: 5,
  //       type: 'video',
  //       videoEmbeddable: 'true'
  //     }
  //   }).then(function success({data}) {callback(data.items);}, function failure({data}) {console.log(data.error);});
  // };
});
