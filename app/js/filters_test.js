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
        expect(radicalMatch(elem, "foo bar nuts")).toBeTruthy();
    });

    it("Finds no match when at least one query radical is not present for an element", function() {
        expect(radicalMatch(elem, "foo bar nuts banana")).not.toBeTruthy();
    });

    it("Finds no match when the search is empty", function() {
        expect(radicalMatch(elem, "")).not.toBeTruthy();
    });
});