'use strict';

var kanjiApp = angular.module('kanjiApp', ['ui.bootstrap.contextMenu']);

kanjiApp.controller('KanjiCtrl', ['$scope', 'search', 'kanjiDictionary', function($scope, search, kanjiDictionary) {
  $scope.savedLists = [ { name: "default",
                          show: false,
                          elements : []},
                        { name: "other",
                          show: false,
                          elements : []}];
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

  $scope.addNewSaveList = function(listName) {
    if (!_.isEmpty(listName)) {
        $scope.savedLists.push({ name: listName,
                                 show: false,
                                 elements: []});
        $scope.newListName = "";
    }
  }

  $scope.searchDisabled = true;
  search.onReady(function() {
      console.log("Enabling search");
      $scope.searchDisabled = false;
  });

  var getSaveItemOptions = function() {
      return [
        [function() { return 'Save to...'},
        null,
        (function() {
            return $scope.savedLists.map(function(savedList) {
                return [
                    savedList.name,
                    function($itemScope) {
                        savedList.elements.push($itemScope.kanji || $itemScope.word);
                    }
                ];
            });
        }())]
        ];
  };


  // Initialize the context menu options and update when a save list is added or removed.
  $scope.saveItemOptions = getSaveItemOptions();
  $scope.$watch(
    'savedLists.length',
    function(newValue, oldValue) {
        console.log("Changed function");
        if (newValue !== oldValue) {
            $scope.saveItemOptions = getSaveItemOptions();
        }
    }
  );


  $scope.removeListOptions = [
    [
    'Remove list',
    function($itemScope) {
        $scope.savedLists.splice($itemScope.$index, 1);
    }
    ]
  ];

  $scope.removeItemOptions = [
    "Remove",
    function($itemScope,$event) {
        console.log($itemScope);
        console.log($event);
    }
  ];
}]);
