const fs = require("fs");
const path = require("path");

console.log("\n====================================");
console.log(" PROMOTING COLLECTION");
console.log("====================================");

const source =
"./collections/API Sentinel - Layer7.postman_collection.json";

const production =
"./production/API Sentinel - Layer7.postman_collection.json";

const backupFolder = "./backup";

// Create backup folder if missing

if (!fs.existsSync(backupFolder)) {

    fs.mkdirSync(backupFolder);

}

// Find next version

const versions = fs.readdirSync(backupFolder)
    .filter(folder => folder.startsWith("Stable-v"));

const nextVersion = versions.length + 1;

const versionFolder =
path.join(
    backupFolder,
    `Stable-v${nextVersion}`
);

// Create Stable-vX

fs.mkdirSync(versionFolder);

// Backup current production

if (fs.existsSync(production)) {

    fs.copyFileSync(
        production,
        path.join(
            versionFolder,
            "API Sentinel - Layer7.postman_collection.json"
        )
    );

    console.log("✓ Previous production backed up");
    console.log("  Version : Stable-v" + nextVersion);

}

// Promote new collection

fs.copyFileSync(
    source,
    production
);

console.log("\n✓ New collection promoted");

console.log("\nProduction File");
console.log(production);

console.log("\n====================================");
console.log(" PROMOTION SUCCESSFUL");
console.log("====================================");