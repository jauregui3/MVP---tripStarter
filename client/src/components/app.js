angular.module('trip-starter', [])

.component('app', {

  controller: function($http, userService, placesService, restCountriesService, notesService) {
    this.userService = userService;
    this.placesService = placesService;
    this.restCountriesService = restCountriesService;
    this.notesService = notesService;

    var self = this;

    this.userService.search(function(user) {
      self.user = user.username;
    });

    this.resetList = function(places) {
      self.places = places.data;
    }

    this.resetNotes = function(notes) {
      self.notes = notes.data;
    }

    this.placesService.search(this.resetList.bind(this));
  },

  templateUrl: 'src/templates/app.html'

});
