var filtersMod = angular.module('kanjiFilters', []).constant('_', window._);

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
}

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
        if (input) {
            input.forEach(function(elem) {
                if (kanjiTextMatch(elem, query)) {
                    out.push(elem);
                }
            });
        }

        return out;
    }
});

filtersMod.filter('kanjiRadSearch', function() {
    return function(input, query) {
        var out = [];
        if (input) {
            input.forEach(function(elem) {
                if (!kanjiTextMatch(elem, query) && radicalMatch(elem, query)) {
                    out.push(elem);
                }
            });
        }

        return out;
    }
});
