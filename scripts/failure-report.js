const fs = require("fs");

console.log("\n======================================");
console.log(" POSTMAN FAILURE REPORT");
console.log("======================================");

// Demo values (later we'll make these dynamic)

const report = {

    timestamp: new Date().toLocaleString(),

    collection: "API Sentinel - Layer7",

    changedApi: "Initiate Transaction",

    failedApi: "Transaction Status",

    endpoint: "/transaction/status",

    method: "GET",

    expectedStatus: 200,

    actualStatus: 500,

    error: "Internal Server Error",

    rootCause:
        "Dependent API failed after Initiate Transaction",

    rollback: "COMPLETED",

    notification: "SENT",

    recommendation:
        "Fix API and re-run pipeline."

};

if (!fs.existsSync("./reports")) {

    fs.mkdirSync("./reports");

}

fs.writeFileSync(
    "./reports/failure-report.json",
    JSON.stringify(report, null, 2)
);

console.log("\nCollection");
console.log("----------------");
console.log(report.collection);

console.log("\nChanged API");
console.log("----------------");
console.log(report.changedApi);

console.log("\nFailed API");
console.log("----------------");
console.log(report.failedApi);

console.log("\nError");
console.log("----------------");
console.log(report.error);

console.log("\nRoot Cause");
console.log("----------------");
console.log(report.rootCause);

console.log("\nRollback");
console.log("----------------");
console.log(report.rollback);

console.log("\nNotification");
console.log("----------------");
console.log(report.notification);

console.log("\nReport Saved");
console.log("----------------");
console.log("./reports/failure-report.json");

console.log("\n======================================");
console.log(" FAILURE REPORT GENERATED");
console.log("======================================");