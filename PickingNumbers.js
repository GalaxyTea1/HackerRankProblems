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
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function pickingNumbers(a) {
    let maxLength = 2;
    let n = a.length;
    
    a.sort((x, y) => x - y);
    let left = 0;
    while (left < n - 1) { 
        let right = left; 
        
        while (right < n - 1 && a[right + 1] - a[left] <= 1) {
            right++; 
        }
        
        maxLength = Math.max(maxLength, right - left + 1);
        left++; 
    }

    return maxLength; 
}

pickingNumbers([1,2,2,3,1,2])

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = pickingNumbers(a);

    ws.write(result + '\n');

    ws.end();
}
