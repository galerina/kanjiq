'use strict';

var kanjiApp = angular.module('kanjiApp', []);

kanjiApp.controller('KanjiCtrl', ['$scope', 'search', 'kanjiDictionary', function($scope, search, kanjiDictionary) {
  $scope.saved = [];
  $scope.findKanji = search.findKanji;
  $scope.findWords = search.findWords;
  $scope.getKanjiMeaning = kanjiDictionary.getMeaning;
  $scope.wordSearchResults = [];
  $scope.kanjiSearchResults = [];
  $scope.updateSearchResults = function(query) {
    search.findKanji($scope.query).then(function(results) {
        console.log("Inside kanji callback");
        $scope.kanjiSearchResults = results;
        console.log($scope.kanjiSearchResults);
    });

    search.findWords($scope.query).then(function(results) {
        console.log("Inside words callback");
        $scope.wordSearchResults = results;
        console.log($scope.wordSearchResults);
    });
  };

  $scope.searchDisabled = true;
  search.onReady(function() {
      console.log("Enabling search");
      $scope.searchDisabled = false;
  });
}]);
