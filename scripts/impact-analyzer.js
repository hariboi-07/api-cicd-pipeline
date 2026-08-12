const fs = require("fs");

// Load dependency graph
const dependencyGraph = JSON.parse(
    fs.readFileSync(
        "./config/dependency-graph.json",
        "utf8"
    )
);

// Changed API
const changedApi = process.argv[2];

if (!changedApi) {

    console.log("Usage:");
    console.log('node scripts/impact-analyzer.js "API Name"');

    process.exit(1);

}

let affected = [];

let current = changedApi;

while (
    dependencyGraph[current] &&
    dependencyGraph[current].nextRequest
) {

    const next = dependencyGraph[current].nextRequest;

    affected.push(next);

    current = next;

}

let risk = "LOW";

if (affected.length >= 5) {

    risk = "HIGH";

}
else if (affected.length >= 2) {

    risk = "MEDIUM";

}

console.log("\n======================================");
console.log(" POSTMAN IMPACT ANALYZER");
console.log("======================================");

console.log("\nChanged API :");

console.log(changedApi);

console.log("\nAffected APIs:");

if (affected.length === 0) {

    console.log("None");

}
else {

    affected.forEach(api => {

        console.log("✓ " + api);

    });

}

console.log("\nRisk Level :", risk);

console.log("Affected APIs :", affected.length);

console.log("\nRecommended Validation:");

console.log("✓ Partial Validation");

if (risk !== "LOW") {

    console.log("✓ Full Regression");

}