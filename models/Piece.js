const uuid = require('uuid/v4');

const all = [];
class Piece {
    constructor(artist, collection, name, text, datapath) {
        this.id = uuid();
        this.artist = artist;
        this.collection = collection;
        this.name = name;
        this.text = text;
        this.datapath = datapath;
        all.push(this);
    }

    static all() {
        return all;
    }
};

module.exports = Piece;
