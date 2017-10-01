const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');

const host = 'https://www.azlyrics.com';
const url = 'https://www.azlyrics.com/a/arcadefire.html';

// const proxies = ["http://skullproxy.com"];
const requestInterval = 4000;

module.exports = (pac, go) => {
    request({url: url/*, proxy: getProxy()*/}, (err, response, html) => {
        if (err) return go(err);
        console.log('im back');
        let $ = cheerio.load(html);
        let albums = {};
        let activeAlbum = null;
        let children = $('#listAlbum').children();
        return async.eachSeries(children,
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
                        console.log('\n\n', lyricsText, '\n\n');
                        if (lyricsText)
                            new pac.models.Piece('arcade fire', song.album, song.name, lyricsText, el.attr('href'));
                        return setTimeout(go, requestInterval);
                    });
                }
                return go();
            }, (e) => {
                console.log(e || 'success');
                console.log('albums', JSON.stringify(albums, null, 4));
                console.log('pieces', JSON.stringify(pac.models.Piece.all(), null, 4));
                if (e) return go(e);
                return fs.writeFile('pieces.json', JSON.stringify(pac.models.Piece.all(), null, 4), go);
                // console.log('emptyLyrics', emptyLyrics);
            });
    });
};

let emptyLyrics = [];
function scrapeLyrics(url, go) {
    request({url: url/*, proxy: getProxy()*/}, (err, response, html) => {
        if (err) return go(err);
        let $ = cheerio.load(html);
        // let divs = $('div:not([class])')
        let mainPage = $('.main-page');
        let row = mainPage.children('.row');
        let lyricsDiv = row.find('div:not([class])');
        // console.log(lyricsDiv.text());
        if (!lyricsDiv.text()) emptyLyrics.push(url);
        return go(null, lyricsDiv.text());
    });
}
// let lyricsUrl = 'https://www.azlyrics.com/lyrics/arcadefire/everythingnow.html';
// scrapeLyrics(lyricsUrl, () => {
//     console.log('hii');
// })

function getProxy() {
    let i = Math.floor(Math.random() * proxies.length);
    console.log(proxies[i]);
    return proxies[i];
}
// getProxy();
