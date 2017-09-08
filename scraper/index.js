const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

const host = 'https://www.azlyrics.com';
const url = 'https://www.azlyrics.com/a/arcadefire.html';

module.exports = (pac, go) => {
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
                    if (!el.text()) return go();
                    let lyricsLink = el.attr('href');
                    let song = {
                        name: el.text(),
                        album: activeAlbum,
                        lyricsLink: el.attr('href')
                    };
                    albums[activeAlbum].push(song);
                    return scrapeLyrics(host + lyricsLink.slice(2), (e, lyricsText) => {
                        if (e) return go(e);
                        song.lyrics = lyricsText;
                        new pac.models.Piece('arcade fire', song.album, song.name, lyricsText, el.attr('href'));
                        return go();
                    });
                }
                return go();
            }, (e) => {
                console.log(e || 'success');
                console.log(JSON.stringify(albums, null, 4));
                go(e);
            });
    });
};

function scrapeLyrics(url, go) {
    console.log('scraping', url);
    request(url, (err, response, html) => {
        let $ = cheerio.load(html);
        // let divs = $('div:not([class])')
        let mainPage = $('.main-page');
        let row = mainPage.children('.row');
        let lyricsDiv = row.find('div:not([class])');
        // console.log(lyricsDiv.text());
        return go(null, lyricsDiv.text());
    });
}
// let lyricsUrl = 'https://www.azlyrics.com/lyrics/arcadefire/everythingnow.html';
// scrapeLyrics(lyricsUrl, () => {
//     console.log('hii');
// })
