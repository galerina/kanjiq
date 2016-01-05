'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Kanjiq', function() {

  describe('word search functionality', function() {
    beforeEach(function() {
      browser.get('index.html');
    });


    it('should show 日本 when I search for "sun + book" ', function() {
      element(by.model('query')).clear().sendKeys('sun + book');

      element(by.repeater('word in').row(0).column('word')).getText().then(function(text) {
        expect(text.includes('日本')).toBe(true);
      });
    });
  });

  describe('kanji search functions', function() {
    it('should show 性 when I search for ["state of mind" life]', function() {
      element(by.model('query')).clear().sendKeys('"state of mind" life');

      element(by.repeater('kanji in').row(0).column('kanji.kanji')).getText().then(function(text) {
        expect(text.includes('性')).toBe(true);
      });
    });

    it('should show 受 and 授 when I search for "accept"', function() {
      element(by.model('query')).clear().sendKeys('accept');

      element(by.repeater('kanji in').row(0).column('kanji.kanji')).getText().then(function(text) {
        expect(text.includes('受')).toBe(true);
        expect(text.includes('授')).toBe(true);
      });
    });
  });

  describe('saving functions', function() {
    // TODO
  });
});
