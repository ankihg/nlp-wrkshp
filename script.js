var natural = require('natural');
// var nounInflector = new natural.NounInflector();
// console.log(nounInflector.pluralize('radius'));
// console.log(nounInflector.singularize('beers'));
//
// var metaphone = natural.Metaphone;
// console.log(metaphone.process('phonetics'));
//
// var dm = natural.DoubleMetaphone;
//
// var encodings = dm.process('Matrix');
// console.log(encodings[0]);
// console.log(encodings[1]);

var wordnet = new natural.WordNet();

wordnet.lookup('fire', function(results) {
    results.forEach(function(result) {
        console.log(JSON.stringify(result, null, 4));
        console.log('------------------------------------');
        // console.log(result.synsetOffset);
        // console.log(result.pos);
        // console.log(result.lemma);
        // console.log(result.synonyms);
        // console.log(result.pos);
        // console.log(result.gloss);
    });
});

// wordnet.get(379335, 'v', function(result) {
//     console.log('------------------------------------');
//     console.log(result);
// });
