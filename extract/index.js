const fs = require('fs');
const async = require('async');

const datapath = './flat_data';

module.exports = (pac, go) => {
    async.series([
        (go) => {
            fs.readdir(datapath, (e, filepaths) => { pac.filepaths = filepaths; go(e); });
        },
        (go) => {
            async.each(pac.filepaths,
                (filepath, go) => {
                    fs.readFile(datapath + '/'  + filepath,
                        (e, txt) => {
                            new pac.models.Piece('arcade fire', 'ep', filepath.split('.')[0], txt.toString(), datapath + '/'  + filepath);
                            go(e);
                        });
                }, go);
        }], go);
}
