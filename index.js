const async = require('async');
const fs = require('fs');

const pac = {
    models: require('./models'),
};

const self = () => {
    async.series([
            // require('./scraper').bind(null, pac),
            require('./import').bind(null, pac),
            require('./transform').bind(null, pac),
        ], (e) => {
            console.log('e', e);
            console.log(JSON.stringify(pac.themes, null, 4));
            return fs.writeFile('themes.json', JSON.stringify(pac.themes, null, 4), () => {});
            // Object.keys(pac.words).forEach((word) => {
            //     console.log(word, pac.words[word].associations);
            //     // let {occurrences, associations} = pac.words[word];
            //     // if (occurrences.length <= 1) return;
            //     // console.log('word:', word);
            //     // console.log('\t' + associations);
            //     // occurrences.forEach((occurrence) => {
            //     //     console.log('\t' + occurrence.line);
            //     // });
            //     // console.log('\n');
            // });
        });
}

self();
