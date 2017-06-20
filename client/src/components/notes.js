angular.module('trip-starter')

.component('notes', {
  templateUrl: "src/templates/notes.html",
  controller: function() {
  },
  bindings: {
    note: '<'
  }
});