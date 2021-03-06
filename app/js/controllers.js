'use strict';

var kanjiApp = angular.module('kanjiApp', ['ui.bootstrap.contextMenu']);

kanjiApp.controller('KanjiCtrl', ['$scope', 'search', 'kanjiDictionary', 'saveListDb', '$http', function(
                                  $scope, search, kanjiDictionary, saveListDb, $http) {
  saveListDb.getSaveLists().then(function(data) {
    data.forEach(function(saveList) {
        saveList.show = false;
    });
    $scope.savedLists = data;
    $scope.saveItemOptions = getSaveItemOptions();
  });

  /*
  $scope.savedLists = [ { name: "default",
                          show: false,
                          elements : []},
                        { name: "other",
                          show: false,
                          elements : []}];
                          */
  $scope.findKanji = search.findKanji;
  $scope.findWords = search.findWords;
  $scope.getKanjiMeaning = kanjiDictionary.getMeaning;
  $scope.wordSearchResults = [];
  $scope.kanjiSearchResults = [];
  $scope.updateSearchResults = function(query) {
    search.findKanji($scope.query).then(function(results) {
        $scope.kanjiSearchResults = results;
    });

    search.findWords($scope.query).then(function(results) {
        $scope.wordSearchResults = results;
    });
  };

  $scope.addNewSaveList = function(listName) {
    if (!_.isEmpty(listName)) {

        saveListDb.createSavedList(listName).then(function(data) {
            $scope.savedLists.push(data);
            $scope.newListName = "";
        });
    }
  }

  $scope.searchDisabled = true;
  search.onReady(function() {
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
                        var element = ($itemScope.kanji || $itemScope.word);
                        saveListDb.addListElement(savedList, element).then(function(data) {
                            savedList.elements.push(element);
                        })
                    }
                ];
            });
        }())]
        ];
  };


  // Initialize the context menu options and update when a save list is added or removed.
  $scope.$watch(
    'savedLists.length',
    function(newValue, oldValue) {
        if (newValue !== oldValue) {
            $scope.saveItemOptions = getSaveItemOptions();
        }
    }
  );


  $scope.removeListOptions = [
    [
    'Remove list',
    function($itemScope) {
        saveListDb.deleteSavedList($scope.savedLists[$itemScope.$index]).then(function(data) {
            $scope.savedLists.splice($itemScope.savedListIndex, 1);
        });
    }
    ]
  ];

  $scope.removeItemOptions = [
  [
    "Remove",
    function($itemScope,$event) {
        var savedList = $scope.savedLists[$itemScope.savedListIndex];
        saveListDb.deleteListElement(savedList, savedList.elements[$itemScope.elementIndex]).then(function(data) {
            $scope.savedLists[$itemScope.savedListIndex].elements.splice($itemScope.elementIndex, 1);
        });
    }
  ]
  ];
}]);
