/*
describe("Filters test", function() {
    describe("Test filter function", function() {
        describe("Test kanji text search filter", function() {

        });

        describe("Test kanji radical search filter", function() {
        });

        describe("Test kanji word search filter", function() {
        });
    });

    describe("Test tokenize", function() {
      it("tokenizes a query string containing double quotes into search terms", function() {
        var tokens = tokenize('"stand up" "mouth"');
        expect(tokens).toContain("stand up");
        expect(tokens).toContain("mouth");
      });

      it("tokenizes a query string containing single quotes into search terms", function() {
        var tokens = tokenize("stand up 'mouth up' ");
        expect(tokens.length).toBe(3);
        expect(tokens).toContain("stand");
        expect(tokens).toContain("mouth up");
      });

      it("tokenizes an invalid query string into an empty list", function() {
        var tokens = tokenize('"unmatched quotes');
        expect(tokens).toEqual([]);
      });
    });

    describe("Test radical match", function() {
        var elem;

        beforeEach(function() {
            elem = {
                radicals : ["k", "l", "z"],
                radicalMeanings : ["bar", "foo", "nuts"]
            };
        });

        it("Finds a match when all query radicals are present for an element", function() {
            expect(radicalMatch(elem, ["foo bar nuts"])).toBeTruthy();
        });

        it("Finds no match when at least one query radical is not present for an element", function() {
            expect(radicalMatch(elem, ["foo bar nuts banana"])).not.toBeTruthy();
        });

        it("Finds no match when the search is empty", function() {
            expect(radicalMatch(elem, [""])).not.toBeTruthy();
        });
    });

    describe("Test possible strings", function() {
        it("Finds all possible strings for a sequence of 'parts' arrays", function() {
            var parts = [["a", "b", "c"],["d","e","f"],["g"]];
            var strings = possibleStrings(parts);
            expect(strings).toContain("adg");
            expect(strings).toContain("aeg");
            expect(strings).toContain("afg");
            expect(strings).toContain("bdg");
            expect(strings).toContain("beg");
            expect(strings).toContain("bfg");
            expect(strings).toContain("cdg");
            expect(strings).toContain("ceg");
            expect(strings).toContain("cfg");
            expect(strings).not.toContain("aaa");
        });
    });

    describe("Test that Japanese text is detected correctly", function() {
        it ("Correctly identifies Japanese text", function() {
            expect(isJapaneseText("日本")).toBeTruthy();
            expect(isJapaneseText("ひらがな")).toBeTruthy();
            expect(isJapaneseText("スペインに")).toBeTruthy();
            expect(isJapaneseText("  スペース  ")).toBeTruthy();
        });

        it ("Correctly identifies non-Japanese text", function() {
            expect(isJapaneseText("apples")).toBeFalsy();
            expect(isJapaneseText("日本rules")).toBeFalsy();
            expect(isJapaneseText("AAAPPひらがな")).toBeFalsy();
        });
    });

    describe("Test union of sorted arrays", function() {
        it ("Returns an empty array for zero arguments", function() {
            expect(unionOfSortedArrays()).toBe
        })
    })
});
*/