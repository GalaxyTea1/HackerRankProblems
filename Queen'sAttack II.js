"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
  let attacks = {
    left: c_q - 1,
    right: n - c_q,
    up: n - r_q,
    down: r_q - 1,
    upLeft: Math.min(n - r_q, c_q - 1),
    upRight: Math.min(n - r_q, n - c_q),
    downLeft: Math.min(r_q - 1, c_q - 1),
    downRight: Math.min(r_q - 1, n - c_q),
  };

  for (let [r, c] of obstacles) {
    let dr = r - r_q;
    let dc = c - c_q;

    if (dr === 0 && dc < 0) {
      attacks.left = Math.min(attacks.left, Math.abs(dc) - 1);
    } else if (dr === 0 && dc > 0) {
      attacks.right = Math.min(attacks.right, dc - 1);
    } else if (dc === 0 && dr > 0) {
      attacks.up = Math.min(attacks.up, dr - 1);
    } else if (dc === 0 && dr < 0) {
      attacks.down = Math.min(attacks.down, Math.abs(dr) - 1);
    } else if (dr === dc && dr > 0) {
      attacks.upRight = Math.min(attacks.upRight, dr - 1);
    } else if (dr === -dc && dr > 0) {
      attacks.upLeft = Math.min(attacks.upLeft, dr - 1);
    } else if (dr === dc && dr < 0) {
      attacks.downLeft = Math.min(attacks.downLeft, Math.abs(dr) - 1);
    } else if (dr === -dc && dr < 0) {
      attacks.downRight = Math.min(attacks.downRight, Math.abs(dr) - 1);
    }
  }

  let totalAttacks = 0;
  for (let direction in attacks) {
    totalAttacks += Math.max(0, attacks[direction]);
  }

  return totalAttacks;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const k = parseInt(firstMultipleInput[1], 10);

  const secondMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const r_q = parseInt(secondMultipleInput[0], 10);

  const c_q = parseInt(secondMultipleInput[1], 10);

  let obstacles = Array(k);

  for (let i = 0; i < k; i++) {
    obstacles[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((obstaclesTemp) => parseInt(obstaclesTemp, 10));
  }

  const result = queensAttack(n, k, r_q, c_q, obstacles);

  ws.write(result + "\n");

  ws.end();
}
