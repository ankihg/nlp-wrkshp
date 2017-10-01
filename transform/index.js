const async = require('async');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const wordnet = new natural.WordNet();

const utils = require('./utils');


module.exports = (pac, go) => {
    async.series([
        (go) => {
            pac.themes = {};
            console.log('how many songs', pac.models.Piece.all().length);
            console.log(pac.models.Piece.all().map((piece) => piece.name));
            async.each(pac.models.Piece.all(),
                (piece, go) => {
                    let stanzas = piece.text.split('\n\n');

                    async.each(stanzas, (stanza, go) => {
                        let lines = stanza.split('\n');
                        async.each(lines, (line, go) => {
                            let words = tokenizer.tokenize(line);
                            async.each(words, (word, go) => {
                                let occurrence = new pac.models.Occurrence(piece.id, stanza, line, word);
                                utils.matchThemes(pac.themes, occurrence, piece);
                                go();
                            }, go);
                        }, go);
                    },go);
                }, go);
        }],
        go);
}
