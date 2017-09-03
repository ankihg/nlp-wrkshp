const uuid = require('uuid/v4');

const all = {
    arr: [],
    id: {},
};
class Occurrence {
    constructor(pieceId, stanza, line, word) {
        this.id = uuid();
        this.pieceId = pieceId;
        this.stanza = stanza;
        this.line = line;
        this.word = word;

        all.arr.push(this);
        all.id[this.id] = this;
    }

    static all(by) {
        return all[by || 'arr'];
    }
};

module.exports = Occurrence;
