/* var filtersMod = angular.module('kanjiFilters', []);
var wordSepChar = "+";

RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
};

var tokenize = function(query) {
    var tokenRE = /(?:([^"'\s]+)\s*)|(?:"([^"']+)"\s*)|(?:'([^"']+)'\s*)/g;

    var match;
    var meaningsMatch = [];
    var lastIndex = 0;
    while (match = tokenRE.exec(query.trim())) {
        if (match.index != lastIndex) {
            break;
        }
        meaningsMatch.push(match[1] || match[2] || match[3]);
        lastIndex = tokenRE.lastIndex;
    }
    return meaningsMatch;
};

var isWordQuery = function(query) {
    return query.includes(wordSepChar);
};

var multiStringRegex = function(strList) {
    var s = strList.map(function(q) {
                        return '(?:^' + q + '$)';
                    }).join('|');

    return new RegExp(s);
};

var matchInList = function(list, query) {
    var retVal = null;
    list.forEach(function(elem) {
	    retVal = (retVal || elem.test(query));
    });

    return retVal;
};

var matchQueryList = function(terms, queryList) {
    if (queryList.length == 0 || terms.length == 0) {
        return false;
    }

    var retVal = true;
    var re = multiStringRegex(terms);
    queryList.forEach(function(elem) {
	    retVal = (retVal && elem.match(re));
    });

    return retVal;
};

var kanjiTextMatch = function(elem, query) {
    return elem["kanji"].match(query) || matchQueryList(elem["meanings"], tokenize(query));
};

var radicalMatch = function(elem, queries) {
    var radicalMatchList = elem["radicals"].concat(elem["radicalMeanings"]);
    for (var i = 0; i < queries.length; i++) {
        if (matchQueryList(radicalMatchList, tokenize(queries[i]))) {
            return true;
        }
    }
    return false;
};

var generateRadicalQueries = function(kanjiList, query, index) {
    var tokens = tokenize(query);
    parts = [];
    tokens.forEach(function(token) {
        var radicalStrings = [' "'+token+'"'].concat(
            index[token].map(function(kanji) {
                kanji.radical.join(" ");
            });
        );

        parts.push(radicalStrings);
    });

    return possibleStrings(parts);
};


filtersMod.filter('kanjiTextSearch', function() {
    return function(input, query) {
        var out = [];

        if (query && isWordQuery(query)) {
            var parts = query.split(wordSepChar);
            query = parts[parts.length - 1];
        }

        if (input && query) {
            query = RegExp.escape(query);
            input.forEach(function(elem, index) {
                if (!elem) { console.log(index); }
                if (kanjiTextMatch(elem, query)) {
                    out.push(elem);
                }
            });
        }

        return out;
    };
});

var unionOfSortedArrays(...arrays) {
    var cursors = [];
    for (var i = 0; i < arrays.length; i++) {
        cursors.push(0);
    }

    var out = [];


    return out;
}

var getMatches = function(kanjiDic, query, index) {
    return unionOfSortedArrays(tokenize(query).map(function(token) {
        return index[token];
    }));
}

filtersMod.filter('kanjiRadSearch', function() {
    return function(input, query, index) {
        var out = [];

        if (query && isWordQuery(query)) {
            var parts = query.split(wordSepChar);
            query = parts[parts.length - 1];
        }

        if (input && query) {
            query = RegExp.escape(query);
            console.log(query);
            var expandedQueries = generateRadicalQueries(input, query);

            expandedQueries.forEach(function(q) {
                out.concat(getMatches(input, q, index));
            }
        }

        return out;
    };
});


var possibleStrings = function(parts) {
    if (_.isEmpty(parts)) {
        return [];
    }

    var combinations = parts[0];
    for (var i = 1; i < parts.length; i++) {
        var newCombinations = [];
        var currentPart = parts[i];
        combinations.forEach(function(c) {
            currentPart.forEach(function(e) {
                newCombinations.push(c + e);
            });
        });

        combinations = newCombinations;
    }

    return combinations;
};

var lookup = function(strings, prefixes) {
    var exactMatches = [];
    var matches = [];
    prefixes.forEach(function(pre) {
        var index = _.sortedIndex(strings, pre);
        while (strings[index].indexOf(pre) == 0) {
            if (strings[index].length == pre.length) {
                exactMatches.push(strings[index]);
            } else {
                matches.push(strings[index]);
            }

            index++;
        }
    });

    return _.unique(exactMatches.concat(matches));
};

var isJapaneseText = function(s) {
    var japaneseRE = /^[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+$/;
    //                  -------------_____________-------------_____________-------------_____________
    //                  Punctuation   Hiragana     Katakana    Full-width       CJK      CJK Ext. A
    //                                                           Roman/      (Common &      (Rare)
    //                                                         Half-width    Uncommon)
    //                                                          Katakana
    return japaneseRE.exec(s.trim());
}

filtersMod.filter('wordSearch', function(kanjiTextSearchFilter, kanjiRadSearchFilter) {
    return function(input, kanjiDic, query) {
        var out = [];
        if (input && query && isWordQuery(query)) {
            if (query[0] == wordSepChar) {
                query = query.slice(1);
            }

            var parts = query.split(wordSepChar).map(function(e) {
                e = RegExp.escape(e.trim());
                if (isJapaneseText(e)) {
                    return [e];
                } else {
                    return _.uniq(kanjiTextSearchFilter(kanjiDic, e).map(function(kanji) {
                        return kanji["kanji"];
                    }));
                }
            });

            var PARTS_THRESHOLD_LENGTH = 500;
            for(var i = 0; i < parts.length; i++) {
                if (parts[i].length > PARTS_THRESHOLD_LENGTH) {
                    return [];
                }
            }

            var prefixes = possibleStrings(parts).sort();
            return lookup(input, prefixes);
        }

        return [];
    };
});

*/
