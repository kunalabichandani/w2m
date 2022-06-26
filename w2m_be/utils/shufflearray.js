const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffleSpliceArray = (array) => {
    return shuffleArray(array).slice(0, 10);
}

module.exports = shuffleSpliceArray;