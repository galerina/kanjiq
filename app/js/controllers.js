'use strict';

var kanjiApp = angular.module('kanjiApp', []);

kanjiApp.controller('KanjiCtrl', ['$scope', 'search', function($scope, search) {
  $scope.saved = [];
  $scope.findKanji = search.findKanji;
  $scope.findWords = search.findWords;

  $scope.searchDisabled = true;
  search.onReady(function() {
      console.log("Enabling search");
      $scope.searchDisabled = false;
  });
}]);
