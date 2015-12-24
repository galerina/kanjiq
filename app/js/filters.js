var filtersMod = angular.module('kanjiFilters', []);

var matchInList = function(list, query) {
    var retVal = null;
    list.forEach(function(elem) {
	retVal = (retVal || elem.match(query));
    });

    return retVal;
}

var kanjiTextMatch = function(elem, query) {
    return elem["kanji"].match(query) || elem["meaning"].match(query) || matchInList(elem["alternateMeanings"], query);
};

var radicalMatch = function(elem, query) {
    var retVal = null;
    var q = new RegExp("^" + query + "$");
    return matchInList(elem["radicals"], q) || matchInList(elem["radicalMeanings"], q);
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
