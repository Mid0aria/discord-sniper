const fs = require("fs");

let tokens = fs
    .readFileSync("alttokens.txt", "utf-8")
    .split("\n")
    .filter(Boolean);

let uniqueIds = new Set();
let uniqueTokens = [];

tokens.forEach((token) => {
    let userId = token.split(".")[0];

    if (!uniqueIds.has(userId)) {
        uniqueIds.add(userId);
        uniqueTokens.push(token);
    }
});

fs.writeFileSync("alttokens.txt", uniqueTokens.join("\n") + "\n");

console.log(`Duplicates deleted. Total ${uniqueTokens.length} tokens remain.`);
