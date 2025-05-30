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
 * Complete the 'birthdayCakeCandles' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY candles as parameter.
 */

function birthdayCakeCandles(candles) {
    // if (candles.length == 1) return 1;
    // let maxCand = Math.max(...candles);
    // let blow = 0;
    // for (let i = 0; i <= candles.length; i++) {
    //     if (candles[i] == maxCand) {
    //         blow += 1;
    //     }
    // }
    // return blow;
    if (candles.length === 0) return 0;
    let max = candles[0];
    let count = 1;
    for (let i = 1; i < candles.length; i++) {
        if (candles[i] > max) {
            max = candles[i];
            count = 1;
        } else if (candles[i] === max) {
            count++;
        }
    }
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const candlesCount = parseInt(readLine().trim(), 10);

    const candles = readLine().replace(/\s+$/g, '').split(' ').map(candlesTemp => parseInt(candlesTemp, 10));

    const result = birthdayCakeCandles(candles);

    ws.write(result + '\n');

    ws.end();
}
