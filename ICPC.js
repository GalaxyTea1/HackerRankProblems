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
 * Complete the 'acmTeam' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY topic as parameter.
 */

function acmTeam(topic) {
  const n = topic.length;
  const m = topic[0].length;
  let maxTopics = 0;
  let teamCount = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let topicsKnown = 0;

      for (let k = 0; k < m; k++) {
        if (topic[i][k] === "1" || topic[j][k] === "1") {
          topicsKnown++;
        }
      }

      if (topicsKnown > maxTopics) {
        maxTopics = topicsKnown;
        teamCount = 1;
      } else if (topicsKnown === maxTopics) {
        teamCount++;
      }
    }
  }

  return [maxTopics, teamCount];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  let topic = [];

  for (let i = 0; i < n; i++) {
    const topicItem = readLine();
    topic.push(topicItem);
  }

  const result = acmTeam(topic);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
