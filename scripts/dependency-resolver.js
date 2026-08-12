const fs = require("fs");

// Load API Map
const apiMap = JSON.parse(
    fs.readFileSync("./config/api-map.json", "utf8")
);

// Read changed API from command line
const changedApi = process.argv[2];

if (!changedApi) {
    console.log("Usage:");
    console.log('node scripts/dependency-resolver.js "API Name"');
    process.exit(1);
}

if (!apiMap[changedApi]) {
    console.log(`API "${changedApi}" not found in api-map.json`);
    process.exit(1);
}

const api = apiMap[changedApi];

console.log("\n======================================");
console.log(" API Dependency Resolver");
console.log("======================================");

console.log("\nChanged API:");
console.log(`✓ ${changedApi}`);

console.log("\nEndpoint:");
console.log(api.endpoint);

console.log("\nMethod:");
console.log(api.method);

console.log("\nDependent APIs:");

if (api.affects.length === 0) {
    console.log("No dependent APIs.");
} else {
    api.affects.forEach(dep => {
        console.log(`✓ ${dep}`);
    });
}

console.log("\n======================================");