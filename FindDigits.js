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
 * Complete the 'findDigits' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function findDigits(n) {
    let count = 0;
    const numStr = n.toString();
    
    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr[i]);
        
        if (digit === 0) {
            continue;
        }
        
        if (n % digit === 0) {
            count++;
        }
    }
    
    return count;
    // let count = 0;
    // let temp = n; 
    
    // while (temp > 0) {
    //     const digit = temp % 10; 
    //     temp = Math.floor(temp / 10); 
        
    //     if (digit === 0) {
    //         continue;
    //     }
        
    //     if (n % digit === 0) {
    //         count++;
    //     }
    // }
    
    // return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const result = findDigits(n);

        ws.write(result + '\n');
    }

    ws.end();
}
