'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'appendAndDelete' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. STRING t
 *  3. INTEGER k
 */

function appendAndDelete(s, t, k) {
    const common_length = getCommonLength(s, t);
    const min_operations = (s.length - common_length) + (t.length - common_length);

    if (k >= s.length + t.length) {
        return "Yes";
    } else if (k >= min_operations && (k - min_operations) % 2 === 0) {
        return "Yes";
    } else {
        return "No";
    }
}

function getCommonLength(s, t) {
    let common_length = 0;
    for (let i = 0; i < Math.min(s.length, t.length); i++) {
        if (s[i] === t[i]) {
            common_length++;
        } else {
            break;
        }
    }
    return common_length;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const t = readLine();

    const k = parseInt(readLine().trim(), 10);

    const result = appendAndDelete(s, t, k);

    ws.write(result + '\n');

    ws.end();
}
