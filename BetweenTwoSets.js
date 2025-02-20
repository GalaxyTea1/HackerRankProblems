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
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a, b) {
    function gcd(x, y) {
        while (y) {
            let temp = y;
            y = x % y;
            x = temp;
        }
        return x;
    }
    
    function arrayLCM(arr) {
        let lcm = arr[0];
        for (let i = 1; i < arr.length; i++) {
            lcm = (lcm * arr[i]) / gcd(lcm, arr[i]);
        }
        return lcm;
    }
    
    function arrayGCD(arr) {
        let g = arr[0];
        for (let i = 1; i < arr.length; i++) {
            g = gcd(g, arr[i]);
            if (g === 0) {
                return 0;
            }
        }
        return g;
    }
    
    function countDivisors(n) {
        if (n === 0) {
            return 0;
        }
        let cnt = 0;
        const sqrtN = Math.sqrt(n);
        for (let i = 1; i <= sqrtN; i++) {
            if (n % i === 0) {
                if (i === n / i) {
                    cnt++;
                } else {
                    cnt += 2;
                }
            }
        }
        return cnt;
    }
    
    const lcm_a = arrayLCM(a);
    const gcd_b = arrayGCD(b);
    
    if (gcd_b % lcm_a !== 0) {
        return 0;
    }
    
    const m = gcd_b / lcm_a;
    
    return countDivisors(m);

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}
