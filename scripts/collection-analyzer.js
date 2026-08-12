const fs = require("fs");

// Read Postman Collection
const collection = JSON.parse(
    fs.readFileSync(
        "./collections/API Sentinel - Layer7.postman_collection.json",
        "utf8"
    )
);

let apiMap = {};
let dependencyGraph = {};
let folderSet = new Set();
// Recursive function
function analyze(items, parentFolder = "") {

    items.forEach(item => {

        // Folder
        if (item.item) {

            folderSet.add(item.name);

            analyze(item.item, item.name);

        }

        // API Request
        if (item.request) {

            const method = item.request.method;

            const endpoint =
                item.request.url.raw || "";

           let nextRequest = null;

// Check Test scripts
if (item.event) {

    item.event.forEach(event => {

        if (event.listen === "test") {

            const script = event.script.exec.join("\n");

            // New Postman syntax
            let match = script.match(
                /pm\.execution\.setNextRequest\("([^"]+)"\)/
            );

            // Old Postman syntax
            if (!match) {

                match = script.match(
                    /postman\.setNextRequest\("([^"]+)"\)/
                );

            }

            if (match) {

                nextRequest = match[1];

            }

        }

    });

}

apiMap[item.name] = {

    folder: parentFolder,

    method: method,

    endpoint: endpoint,

    nextRequest: nextRequest

};
dependencyGraph[item.name] = {

    nextRequest: nextRequest

};

        }

    });

}

analyze(collection.item);
const metadata = {

    collectionName: collection.info.name,

    totalFolders: folderSet.size,

    totalApis: Object.keys(apiMap).length,

    generatedOn: new Date().toLocaleString(),

    generator: "Postman Smart Validation Gateway",

    version: "1.0"

};


// Save api-map.json
fs.writeFileSync(
    "./config/api-map.json",
    JSON.stringify(apiMap, null, 2)
);
fs.writeFileSync(
    "./config/dependency-graph.json",
    JSON.stringify(dependencyGraph, null, 2)
);
fs.writeFileSync(
    "./config/collection-metadata.json",
    JSON.stringify(metadata, null, 2)
);
console.log("\n======================================");
console.log(" POSTMAN COLLECTION INTELLIGENCE");
console.log("======================================");

console.log("✅ api-map.json generated");
console.log("✅ dependency-graph.json generated");
console.log("✅ collection-metadata.json generated");

console.log("\nTotal APIs :", Object.keys(apiMap).length);
console.log("Total Folders :", folderSet.size);
