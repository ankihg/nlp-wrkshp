const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.azlyrics.com/a/arcadefire.html';

request(url, (err, response, html) => {
    if (err) console.log('error', err);

    let $ = cheerio.load(html);
    let albums = {};
    let activeAlbum = null;
    $('#listAlbum').children().filter(function() {
        var el = $(this);
        // console.log('show el', el[0]);
        // console.log('show el', el[0].name);
        if (el[0].name == 'div') {
            // console.log('album', el.text());
            activeAlbum = el.text();
            albums[el.text()] = [];
        }
        else if (el[0].name == 'a') {
            // console.log('song', el.text());
            if (activeAlbum)
                albums[activeAlbum].push({
                    name: el.text(),
                    lyricLink: el.attr('href'),
                });
            // console.log('show el \n');
            // console.log(el);
        }
    });
    console.log(albums);
});
