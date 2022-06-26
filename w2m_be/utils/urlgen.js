const { customAlphabet } = require('nanoid/non-secure');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 10);

const generateURL = () => {
    return nanoid();
}

module.exports = generateURL;