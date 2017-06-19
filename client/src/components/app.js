angular.module('trip-starter', [])

.component('app', {
  controller: function(userService) {
    this.userService = userService;
    var that = this;

    this.userService.search(function(user) {
      console.log('this is in the controller', user.username);
      that.user = user.username;
    });

    // this.places.search(function(places) {
    //   console.log(places);
    //   that.places = places;
    // })
  },
  templateUrl: 'src/templates/app.html'

});
