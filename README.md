# Kanjiq - a kanji search tool

When learning Japanese, looking up unknown Japanese words and kanji in digital materials is trivial using web dictionaries.
However, when you are out in the wild reading plain, analog Japanese, finding the reading and meaning of words you don't
understand can be cumbersome. I built KanjiQ to allow a user to search for Kanji using English keywords like those used
in Heisig's "Remembering the Kanji". There are already web dictionaries that will find Kanji by meaning but KanjiQ
takes things one step further by allowing the user to query a kanji by its parts, each of which is specified by an
English meaning. For example, when searching for a complicated kanji like 樹, the queries 'tree measurement' or 'tree
beans' each produce a short list of kanji which contain the correct kanji.

## Getting Started

Try these sample searches to get a feel for what you can do:

'"stand up" person'

'"state of mind"'

## Internals

Files are served by a super-light NodeJS server and all kanji queries execute client-side in an AngularJS app structure.

## Acknowledgements

This site uses the [RADKFILE/KRADFILE](http://www.csse.monash.edu.au/~jwb/kradinf.html) dictionary files. These files are
the property of the [Electronic Dictionary Research and Development Group](http://www.edrdg.org/), and are used in
conformance with the Group's licence.

These files made my job pretty easy.
