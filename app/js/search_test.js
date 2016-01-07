describe("Search test", function() {
    describe("Test find kanji", function() {
        beforeEach(module("kanjiApp"));

        var search;
        beforeEach(inject(function($injector, _search_) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');
            // backend definition common for all tests
            $httpBackend.when('GET', 'data/kanjiLookup.json')
                                   .respond({"set 1":["aa","bb","cc"], "set2":["bb"], "set3":["bb", "cc"]});
            $httpBackend.when('GET', 'data/jwords.json')
                                   .respond([]);

            search = _search_;
        }));

        it("returns [] when the query is empty", function() {
            $httpBackend.flush();
            expect(search.findKanji("")).toEqual([]);
        });

        it("returns expected results when query is non-empty", function() {
            $httpBackend.flush();
            expect(search.findKanji('"set 1" set2')).toEqual(["bb"]);
            expect(search.findKanji('"set 1" set3')).toEqual(["bb","cc"]);
            expect(search.findKanji('"set 1"')).toEqual(["aa","bb","cc"]);
        })
    });
});