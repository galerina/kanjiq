# Kanjiq - a kanji search tool

[http://kanjiq.org](http://kanjiq.org) - (hosted on Heroku, the search box won't activate until loading is completed)

When learning Japanese, looking up unknown Japanese words and kanji in digital materials is easy using web dictionaries.
However, out in the wild where Japanese text is on papers, signs, and TV screens, finding the reading and meaning of words you don't understand can be cumbersome. I built KanjiQ to allow a user to search for Kanji using English keywords  ('日'<==>'day'||'sun'). There are already web dictionaries that will find Kanji by keyword but KanjiQ takes things one step further by allowing the user to query a kanji by its parts, each of which is specified by an English meaning. For example, when searching for a complicated kanji like 樹, the queries 'tree measurement' or 'tree beans' will each produce a short list of kanji containing the searched-for one.

## Getting Started

Try these sample searches to get a feel for what you can do:

'"stand up" person'

'"state of mind" life'

## Background

I have been studying Japanese in Japan since April 2015. In Japan there is text everywhere but the existing search-for-kanji methods that I found were painfully slow (select radicals from a large array of click boxes, count strokes and lookup in an index). I wanted something better.

In Heisig's "Remembering the Kanji", kanji and primitives (primitives are roughly analogous to radicals) are each given a distinct English meaning. When learning a new kanji, either the kanji is a brand new shape, or much more commonly the kanji is composed of other kanji and/or primitives. To memorize the kanji you associate the subpart keywords with the main keyword. Since I've spent considerable time learning the kanji in this way, it is pretty easy for me to separate new kanji into known subparts. There was no way of leveraging this knowledge until I built Kanjiq.

## Internals

Files are served by a super-light NodeJS server and all kanji queries execute client-side in an AngularJS app structure. This is the first time I've used Angular so I'm still figuring things out. TODO: I should move data to a database because loading the files causes considerable delay.

## Acknowledgements

This site uses the [RADKFILE/KRADFILE](http://www.csse.monash.edu.au/~jwb/kradinf.html) dictionary files. These files are
the property of the [Electronic Dictionary Research and Development Group](http://www.edrdg.org/), and are used in
conformance with the Group's licence.

These files made my job pretty easy.
