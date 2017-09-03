const async = require('async');

const pac = {
    models: require('./models'),
};

const self = () => {
    async.series([
            require('./extract').bind(null, pac),
            require('./transform').bind(null, pac),
        ], (e) => {
            console.log('e', e);
            console.log(pac.models.Piece);
        });
}

self();
