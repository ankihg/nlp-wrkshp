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
            console.log(pac.models.Occurrence.all('id'));
            // Object.keys(pac.words).forEach((word) => {
            //     let occurrences = pac.words[word];
            //     if (occurrences.length <= 1) return;
            //     console.log('word:', word);
            //     occurrences.forEach((occurrence) => {
            //         console.log('\t' + occurrence.line);
            //     });
            //     console.log('\n');
            // });
        });
}

self();
