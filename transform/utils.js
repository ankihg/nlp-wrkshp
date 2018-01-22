const natural = require('natural');

const metadata = require('./metadata');

module.exports = {
    matchThemes(holder, occurrence, piece) {
        let word = natural.PorterStemmer.stem(occurrence.word.toLowerCase());
        let themes = metadata.wordToThemes[word] || [];
        // if (metadata.themes[word]) themes.push(word);
        themes.forEach((theme) => {
            holder[theme] = holder[theme] || {};
            holder[theme][word] = holder[theme][word] || [];
            holder[theme][word].push(occurrence.line);
            // holder[theme][word] = holder[theme][word] || {};
            // holder[theme][word][piece.collection] = holder[theme][word][piece.collection] || {};
            // holder[theme][word][piece.collection][piece.name] = holder[theme][word][piece.collection][piece.name] || [];
            // holder[theme][word][piece.collection][piece.name].push(occurrence.line);
        });
    }
};


function _buildWordToThemes(themes) {

}
