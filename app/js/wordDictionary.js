angular.module('kanjiApp').factory('wordDictionary', ['$http', function($http) {
    var words;

    $http.get('data/jwords.json').success(function(data) {
        words = data;
    });

    return {
        getWordsMatchingPrefix : function(prefix) {
            var matches = [];
            var index = _.sortedIndex(words, prefix);
            console.log(words[index]);
            while (words[index].indexOf(prefix) == 0) {
                matches.push(words[index])
                index++;
            }

            // Why are there dups in our dictionary?
            return _.uniq(matches);
        },
    };
}]);
