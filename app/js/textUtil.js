angular.module('kanjiApp').factory('textUtil', function($http) {
    var obj = {};


    var japaneseRE = /^[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]+$/;
            //          -------------_____________-------------_____________-------------_____________
            //           Punctuation   Hiragana     Katakana    Full-width       CJK      CJK Ext. A
            //                                                     Roman/      (Common &      (Rare)
            //                                                    Half-width    Uncommon)
            //                                                     Katakana
    obj.isJapaneseText = function(s) {
        return japaneseRE.exec(s.trim());
    };


    var kanjiRE = /^[\u4e00-\u9faf\u3400-\u4dbf]$/;
    obj.isKanji = function(s) {
        return kanjiRE.exec(s);
    };

    var kanaRE = /^[\u3040-\u309f\u30a0-\u30ff]+$/;
    obj.isKanaText = function(s) {
        return kanaRE.exec(s.trim());
    };

    return obj;
});
