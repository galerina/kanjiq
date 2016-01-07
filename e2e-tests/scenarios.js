'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Kanjiq', function() {

  var getTextArrayForLocator = function(locator) {
    var column = element.all(locator);

    return column.map(function(elm) {
        return elm.getText();
    });
  };

  describe('word search functionality', function() {
    beforeEach(function() {
      browser.get('index.html');
    });

    it('should show 日本 when I search for "sun + book" ', function() {
      element(by.model('query')).clear().sendKeys('sun + book');

      var words = getTextArrayForLocator(by.repeater('word in').column('word'));

      expect(words).toContain('日本');
    });
  });

  describe('kanji search functions', function() {
    it('should show 性 when I search for ["state of mind" life]', function() {
      element(by.model('query')).clear().sendKeys('"state of mind" life');

      var kanji = getTextArrayForLocator(by.repeater('kanji in').column('kanji'));

      expect(kanji).toContain('性');
    });

    it('should show 受 and 授 when I search for "accept"', function() {
      element(by.model('query')).clear().sendKeys('accept');

      var kanji = getTextArrayForLocator(by.repeater('kanji in').column('kanji'));

      expect(kanji).toContain('受');
      expect(kanji).toContain('授');
    });

    it('should show 濃 and 農 when I search for "agriculture"', function() {
      element(by.model('query')).clear().sendKeys('agriculture');
      var kanji = getTextArrayForLocator(by.repeater('kanji in').column('kanji'));

      expect(kanji).toContain('濃');
      expect(kanji).toContain('農');
    });
  });

  describe('saving functions', function() {
    // TODO
  });
});
