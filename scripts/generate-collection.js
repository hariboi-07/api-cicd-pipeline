const fs = require("fs");

// Load original Postman collection
const collection = JSON.parse(
    fs.readFileSync(
        "./collections/API Sentinel - Layer7.postman_collection.json",
        "utf8"
    )
);

// Load API Map
const apiMap = JSON.parse(
    fs.readFileSync("./config/api-map.json", "utf8")
);

// Read changed API
const changedApi = process.argv[2];

if (!changedApi) {
    console.log('Usage: node scripts/generate-collection.js "API Name"');
    process.exit(1);
}

if (!apiMap[changedApi]) {
    console.log("API not found.");
    process.exit(1);
}

// APIs to include
const requiredApis = [
    changedApi,
    ...(apiMap[changedApi].affects || [])
];

console.log("\nGenerating temporary collection...\n");

// Deep copy
const newCollection = JSON.parse(JSON.stringify(collection));
newCollection.item = [];

// Traverse folders recursively
function filterItems(items) {

    let result = [];

    items.forEach(item => {

        // Request
        if (item.request) {

            if (requiredApis.includes(item.name)) {

                result.push(item);
                console.log("✓ " + item.name);

            }

        }

        // Folder
        else if (item.item) {

            let filtered = filterItems(item.item);

            if (filtered.length > 0) {

                let newFolder = {
                    ...item,
                    item: filtered
                };

                result.push(newFolder);

            }

        }

    });

    return result;

}

newCollection.item = filterItems(collection.item);

// Save collection
fs.writeFileSync(
    "./collections/temp-collection.json",
    JSON.stringify(newCollection, null, 2)
);

console.log("\nTemporary collection created.");
console.log("collections/temp-collection.json");