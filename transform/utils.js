const natural = require('natural');
const nounInflector = new natural.NounInflector();

const metadata = require('./metadata');

module.exports = {
    matchThemes(holder, occurrence) {
        let word = nounInflector.singularize(occurrence.word.toLowerCase());
        let themes = metadata.wordToThemes[word] || [];
        themes.forEach((theme) => {
            holder[theme] = holder[theme] || {};
            holder[theme][word] = holder[theme][word] || [];
            holder[theme][word].push(occurrence.line);
        });
    }
};
