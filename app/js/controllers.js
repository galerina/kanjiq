'use strict';

var kanjiApp = angular.module('kanjiApp', []);

kanjiApp.controller('KanjiCtrl', ['$scope', 'search', 'kanjiDictionary', function($scope, search, kanjiDictionary) {
  $scope.saved = [];
  $scope.findKanji = search.findKanji;
  $scope.findWords = search.findWords;
  $scope.getKanjiMeaning = kanjiDictionary.getMeaning;

  $scope.searchDisabled = true;
  search.onReady(function() {
      console.log("Enabling search");
      $scope.searchDisabled = false;
  });
}]);
