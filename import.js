module.exports = (pac, go) => {
    pac.models.Piece.import('./pieces.json');
    return go();
}
