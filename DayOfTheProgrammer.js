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
 * Complete the 'dayOfProgrammer' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER year as parameter.
 */

function dayOfProgrammer(year) {
    let febDays;
    if (year === 1918) {
        febDays = 15; // 2/1918
    } else if (year < 1918) {
        // Julian
        febDays = (year % 4 === 0) ? 29 : 28;
    } else {
        // Gregorian
        const isLeap = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
        febDays = isLeap ? 29 : 28;
    }
    const months = [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let sum = 0;
    let month, day;
    for (let i = 0; i < months.length; i++) {
        const daysInMonth = months[i];
        if (sum + daysInMonth >= 256) {
            month = i + 1; 
            day = 256 - sum;
            break;
        } else {
            sum += daysInMonth;
        }
    }
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    return `${formattedDay}.${formattedMonth}.${year}`;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = dayOfProgrammer(year);

    ws.write(result + '\n');

    ws.end();
}
