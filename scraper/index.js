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
        function(child) {
            var el = $(child);

            if (el[0].name == 'div') {
                activeAlbum = el.text();
                albums[el.text()] = [];
            } else if (el[0].name == 'a') {
                if (!el.text()) return;
                let lyricsLink = el.attr('href');

                albums[activeAlbum].push(el.text());

            }
        }, (e) => {
            console.log(e || 'success');
        });

    // $('#listAlbum').children().filter(function() {
    //
    // });
    console.log(albums);
});


function scrapeLyrics(url) {
    request(url, (err, response, html) => {

    });
}
