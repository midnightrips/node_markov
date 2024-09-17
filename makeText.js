/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');
const process = require('process');

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}\n ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function makeURLText(url) {
    try {
        let res = await axios.get(url);
    } catch {
        console.error(`Cannot read URL: ${url}\n ${err}`);
        process.exit(1);
    }
    generateText(res.data);
}

let [method, path] = process.argv.slice(2); /* node makeText.js file file_name */

if (method === 'file') {
    makeText(path);
} else if (method === 'url') {
    makeURLText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}