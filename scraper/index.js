const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

const host = 'https://www.azlyrics.com';
const url = 'https://www.azlyrics.com/a/arcadefire.html';

request(url, (err, response, html) => {
    if (err) console.log('error', err);

    let $ = cheerio.load(html);
    let albums = {};
    let activeAlbum = null;
    let children = $('#listAlbum').children();
    async.each(children,
        function(child, go) {
            let el = $(child);

            if (el[0].name == 'div') {
                activeAlbum = el.text();
                albums[el.text()] = [];
                return go();
            } if (el[0].name == 'a') {
                if (!el.text()) return;
                let lyricsLink = el.attr('href');
                return scrapeLyrics(host + lyricsLink.slice(2), (e) => {
                    return go(e);
                });
            }
        }, (e) => {
            console.log(e || 'success');
        });

    // $('#listAlbum').children().filter(function() {
    //
    // });
    console.log(albums);
});


function scrapeLyrics(url, go) {
    request(url, (err, response, html) => {
        // console.log('html', html);
        return go();
    });
}
