/**
 * Created by Terry on 2016-12-15.
 */

const camerlize = (str) => {
    let words = str.split(' ');
    let len = words.length;
    words[0] = words[0].toLowerCase();
    for(let i=1; i<len; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join('');
};

export default camerlize;

