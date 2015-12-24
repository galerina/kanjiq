'use strict';

// var kanjiApp = angular.module('myApp', []);
var kanjiApp = angular.module('kanjiApp', ['kanjiFilters']);

kanjiApp.controller('KanjiCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('kanji/kanji2500.json').success(function(data) {
    $scope.kanjis = data;
  });

  $scope.orderProp = 'frequencyRank';
}]);
