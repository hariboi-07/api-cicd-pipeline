const fs = require("fs");
const path = require("path");

console.log("\n====================================");
console.log(" AUTOMATIC ROLLBACK");
console.log("====================================");

// Paths
const backupFolder = "./backup";
const collection =
    "./collections/API Sentinel - Layer7.postman_collection.json";

// Backup folder exists?

if (!fs.existsSync(backupFolder)) {

    console.log("❌ Backup folder not found.");
    process.exit(1);

}

// Get all Stable-v folders

const versions = fs.readdirSync(backupFolder)
    .filter(name => {

        const fullPath = path.join(backupFolder, name);

        return (
            fs.statSync(fullPath).isDirectory() &&
            name.startsWith("Stable-v")
        );

    });

if (versions.length === 0) {

    console.log("❌ No stable versions available.");
    process.exit(1);

}

// Sort versions

versions.sort((a, b) => {

    const v1 = parseInt(a.replace("Stable-v", ""));
    const v2 = parseInt(b.replace("Stable-v", ""));

    return v2 - v1;

});

// Latest Stable Version

const latestVersion = versions[0];

const backupCollection =
path.join(
    backupFolder,
    latestVersion,
    "API Sentinel - Layer7.postman_collection.json"
);

// File exists?

if (!fs.existsSync(backupCollection)) {

    console.log("❌ Stable collection not found.");
    process.exit(1);

}

// Restore

fs.copyFileSync(
    backupCollection,
    collection
);

console.log("\n✓ Latest Stable Version");
console.log("  " + latestVersion);

console.log("\n✓ Collection Restored");

console.log("\nRestored File");
console.log(collection);

console.log("\n====================================");
console.log(" ROLLBACK COMPLETED");
console.log("====================================");