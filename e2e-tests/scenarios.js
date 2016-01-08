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

    it('should show 激しい when I search for "violent+し" ', function() {
      element(by.model('query')).clear().sendKeys('violent+し');

      var words = getTextArrayForLocator(by.repeater('word in').column('word'));

      expect(words).toContain('激しい');
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

    it('should show 本 and 体 when I search for "本"', function() {
      element(by.model('query')).clear().sendKeys('本');
      var kanji = getTextArrayForLocator(by.repeater('kanji in').column('kanji'));

      expect(kanji).toContain('本');
      expect(kanji).toContain('体');
    });


  });

  describe('saving functions', function() {
    // TODO
  });
});
