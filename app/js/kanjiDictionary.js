angular.module('kanjiApp').factory('kanjiDictionary', ['$http', function($http) {
    var kanjis;
    $http.get('data/kanji-new-format.json').success(function(data) {
        kanjis = data;
    });

    return {
        getRadicals : function(kanjiText) {
            return kanjis[kanjiText]["radical"];
        }
    };
}]);
