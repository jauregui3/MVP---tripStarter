angular.module('trip-starter')

.component('placesList', {
  templateUrl: "src/templates/placesList.html",
  controller: function() {
  },
  bindings: {
    places: '<',
    countriesService: '<',
    notesService: '<',
    resetNotes: '<'
  }
});