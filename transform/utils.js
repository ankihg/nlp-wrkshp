const natural = require('natural');

const metadata = require('./metadata');

module.exports = {
    matchThemes(holder, occurrence) {
        let word = natural.PorterStemme.stem(occurrence.word.toLowerCase());
        let themes = metadata.wordToThemes[word] || [];
        if (metadata.themes[word]) themes.push(word);
        themes.forEach((theme) => {
            holder[theme] = holder[theme] || {};
            holder[theme][word] = holder[theme][word] || [];
            holder[theme][word].push(occurrence.line);
        });
    }
};
