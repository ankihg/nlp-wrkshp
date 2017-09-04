const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

const url = 'https://www.azlyrics.com/a/arcadefire.html';

request(url, (err, response, html) => {
    if (err) console.log('error', err);

    let $ = cheerio.load(html);
    let albums = {};
    let activeAlbum = null;
    $('#listAlbum').children().filter(function() {
        var el = $(this);

        if (el[0].name == 'div') {
            activeAlbum = el.text();
            albums[el.text()] = [];
        } else if (el[0].name == 'a') {
            if (activeAlbum)
                albums[activeAlbum].push({
                    name: el.text(),
                    lyricLink: el.attr('href'),
                });
        }
    });
    console.log(albums);
});
