const uuid = require('uuid/v4');

const all = {
    arr: [],
    id: {},
};
class Piece {
    constructor(artist, collection, name, text, datapath) {
        this.id = uuid();
        this.artist = artist;
        this.collection = collection;
        this.name = name;
        this.text = text;
        this.datapath = datapath;
        all.arr.push(this);
        all.id[this.id] = this;
    }

    static all(by) {
        return all[by || 'arr'];
    }
};

module.exports = Piece;
