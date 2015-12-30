var filtersMod = angular.module('kanjiFilters', []).constant('_', window._);

var wordSepChar = "+";
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
	    retVal = (retVal || elem.match(query));
    });

    return retVal;
};

var matchQueryList = function(terms, queryList) {
    // TODO: Use lodash here
    if (queryList.length == 0 || terms.length == 0) {
        return false;
    }

    var retVal = true;
    re = multiStringRegex(terms);
    queryList.forEach(function(elem) {
	    retVal = (retVal && elem.match(re));
    });

    return retVal;
};

var kanjiTextMatch = function(elem, query) {
    return elem["kanji"].match(query) || elem["meaning"].match(query) || matchInList(elem["alternateMeanings"], tokenize(query));
};

var radicalMatch = function(elem, query) {
    var retVal = null;
    return matchQueryList(elem["radicals"], tokenize(query)) || matchQueryList(elem["radicalMeanings"], tokenize(query));
};

filtersMod.filter('kanjiTextSearch', function() {
    return function(input, query) {
        var out = [];
        if (input && query && !isWordQuery(query)) {
            input.forEach(function(elem) {
                if (kanjiTextMatch(elem, query)) {
                    out.push(elem);
                }
            });
        }

        return out;
    };
});

filtersMod.filter('kanjiRadSearch', function() {
    return function(input, query) {
        var out = [];
        if (input && query && !isWordQuery(query)) {
            input.forEach(function(elem) {
                if (!kanjiTextMatch(elem, query) && radicalMatch(elem, query)) {
                    out.push(elem);
                }
            });
        }

        return out;
    };
});


var possibleStrings = function(parts) {
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
        console.log(index);
        while (strings[index].indexOf(pre) == 0) {
            if (strings[index].length == pre.length) {
                exactMatches.push(strings[index]);
            } else {
                matches.push(strings[index]);
            }

            index++;
        }
    });

    return exactMatches.concat(matches);
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

filtersMod.filter('wordSearch', function(kanjiTextSearchFilter) {
    return function(input, kanjiDic, query) {
        var out = [];
        if (input && query && isWordQuery(query)) {
            var parts = query.split(wordSepChar).map(function(e) {
                if (isJapaneseText(e)) {
                    return [e];
                } else {
                    return kanjiTextSearchFilter(kanjiDic, e).map(function(kanji) {
                        return kanji["kanji"];
                    });
                }
            });

            var prefixes = possibleStrings(parts).sort();
            return lookup(input, prefixes);
        }

        return [];
    };
});
