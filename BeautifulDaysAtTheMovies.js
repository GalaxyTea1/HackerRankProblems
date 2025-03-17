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
 * Complete the 'beautifulDays' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER i
 *  2. INTEGER j
 *  3. INTEGER k
 */

function reverseNumber(n) {
    let reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n = Math.floor(n / 10);
    }
    return reversed;
}

function beautifulDays(i, j, k) {
    // let beautifulDays = 0;
    
    // for (let x = i; x <= j; x++) {
    //     let reverseNum  = x.toString().split('').reverse().join('');
    //     if (Math.abs(x - reverseNum) % k ==0) {
    //         beautifulDays++;
    //     };
    // }
    // return beautifulDays;
    let count = 0;
    for (let day = i; day <= j; day++) {
        let reversed = reverseNumber(day);
        let difference = Math.abs(day - reversed);
        if (difference % k === 0) {
            count++;
        }
    }
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const i = parseInt(firstMultipleInput[0], 10);

    const j = parseInt(firstMultipleInput[1], 10);

    const k = parseInt(firstMultipleInput[2], 10);

    const result = beautifulDays(i, j, k);

    ws.write(result + '\n');

    ws.end();
}
