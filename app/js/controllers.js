'use strict';

// var kanjiApp = angular.module('myApp', []);
var kanjiApp = angular.module('kanjiApp', ['kanjiFilters']);

kanjiApp.controller('KanjiCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/kanjinew.json').success(function(data) {
    $scope.kanjis = data;
  });

  $http.get('data/jwords.json~').success(function(data) {
    $scope.dictionary = data;
  });

  $scope.saved = [];
  $scope.orderProp = 'frequencyRank';
}]);
