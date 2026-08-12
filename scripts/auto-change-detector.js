const fs = require("fs");

// Current Collection
const current = JSON.parse(
    fs.readFileSync(
        "./collections/API Sentinel - Layer7.postman_collection.json",
        "utf8"
    )
);

// Stable Collection
const previous = JSON.parse(
    fs.readFileSync(
        "./production/API Sentinel - Layer7.postman_collection.json",
        "utf8"
    )
);

let currentApis = {};
let previousApis = {};

function extract(items, map) {

    items.forEach(item => {

        if (item.item) {
            extract(item.item, map);
        }

        if (item.request) {

            map[item.name] = JSON.stringify(item);

        }

    });

}

extract(current.item, currentApis);
extract(previous.item, previousApis);

let changedApi = null;

for (const api in currentApis) {

    if (!previousApis[api]) {

        changedApi = api;
        break;

    }

    if (currentApis[api] !== previousApis[api]) {

        changedApi = api;
        break;

    }

}

if (!changedApi) {

    console.log("\nNo API changes detected.");
    process.exit(0);

}

fs.writeFileSync(
    "./config/current-change.json",
    JSON.stringify(
        {
            changedApi: changedApi
        },
        null,
        2
    )
);

console.log("\n======================================");
console.log(" AUTO CHANGE DETECTOR");
console.log("======================================");

console.log("Changed API :", changedApi);

console.log("\ncurrent-change.json updated.");