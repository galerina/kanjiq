angular.module('kanjiApp').factory('wordDictionary', ['$http', 'textUtil', function($http, textUtil) {
    var words;

    $http.get('data/jwords.json').success(function(data) {
        words = data;
    });

    var getJishoResults = function(s, callback) {
        var apiURL = '/jishoapi/' + encodeURIComponent(s);

        $http.get(apiURL).success(function(data) {
            var results = [];
            data["data"].map(function(wordData) {
                var firstWordInstance = wordData["japanese"][0];
                if (_.has(firstWordInstance, "word")) {
                    results.push(firstWordInstance["word"]);
                } else {
                    results.push(firstWordInstance["reading"]);
                }
            });

            callback(results);
        }).error(function() {
            callback([]);
        });
    };

    return {
        wordsMatchingPrefix :
        function(prefix) {
            return {
            then : function(callback) {
                if (textUtil.isKanaText(prefix)) {
                    getJishoResults(prefix, callback);
                    return;
                }

                var matches = [];
                var index = _.sortedIndex(words, prefix);
                while (words[index].indexOf(prefix) == 0) {
                    matches.push(words[index])
                    index++;
                }

                // Why are there dups in our dictionary?
                    callback(_.uniq(matches));
                }
            }
        },
    };
}]);
