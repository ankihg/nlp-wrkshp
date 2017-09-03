const async = require('async');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

module.exports = (pac, go) => {
    async.series([
        (go) => {
            pac.words = {};
            async.each(pac.models.Piece.all(),
                (piece, go) => {
                    let stanzas = piece.text.split('\n\n');
                    stanzas.forEach((stanza) => {
                        let lines = stanza.split('\n');
                        lines.forEach((line) => {
                            var words = tokenizer.tokenize(line);
                            words.forEach((word) => {
                                let key = word.toLowerCase();
                                pac.words[key] = pac.words[key] || [];
                                pac.words[key].push({
                                    pieceId: piece.id,
                                    stanza: stanza,
                                    line: line,
                                    word: word,
                                });
                            });
                        });
                    });

                    go();
                }, go);
        }],
        (e) => {
            console.log(pac.words);
            console.log('e', e);
        });
}
