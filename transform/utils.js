const natural = require('natural');
const stem = natural.PorterStemmer.stem;
const wordToThemes = _buildWordToThemes(require('./metadata').themes);
console.log('wordToThemes', wordToThemes);
module.exports = {
    matchThemes(holder, occurrence, piece) {
        let word = stem(occurrence.word.toLowerCase());
        let themes = wordToThemes[word] || [];
        // if (metadata.themes[word]) themes.push(word);
        Object.keys(themes).forEach((theme) => {
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
    return Object.keys(themes).reduce((wordToThemes, themeKey) => {
        wordToThemes[stem(themeKey)] = wordToThemes[stem(themeKey)] || {};
        wordToThemes[stem(themeKey)][themeKey] = true;
        Object.keys(themes[themeKey]).forEach((word) => {
            wordToThemes[stem(word)] = wordToThemes[stem(word)] || {};
            wordToThemes[stem(word)][themeKey] = true;
        });
        return wordToThemes;
    }, {});
}
