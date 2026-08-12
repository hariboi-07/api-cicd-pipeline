const { execSync } = require("child_process");
const fs = require("fs");

console.log("\n========================================");
console.log(" API Sentinel Intelligent CI/CD Pipeline");
console.log("========================================");

try {

    console.log("\nSTEP 1 - Detect Changed Files");
    execSync("node scripts/git-change-detector.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 2 - Detect Changed APIs");
    execSync("node scripts/find-changed-api.js", {
        stdio: "inherit"
    });

    // Read changed APIs
    const changedApis = JSON.parse(
        fs.readFileSync("./config/changed-apis.json", "utf8")
    );

    if (changedApis.length === 0) {

        console.log("\nNo API changes detected.");
        process.exit(0);

    }

    const api = changedApis[0];

    console.log("\nChanged API:");
    console.log(api);

    console.log("\nSTEP 3 - Resolve Dependencies");
    execSync(`node scripts/dependency-resolver.js "${api}"`, {
        stdio: "inherit"
    });

    console.log("\nSTEP 4 - Generate Temporary Collection");
    execSync(`node scripts/generate-collection.js "${api}"`, {
        stdio: "inherit"
    });

    console.log("\nSTEP 5 - Run Changed APIs");
    execSync("node scripts/run-temp-tests.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 6 - Run Full Collection");
    execSync("node scripts/run-full-tests.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 7 - Promote to Production");

    console.log("Production deployment completed.");

    console.log("\n========================================");
    console.log(" PIPELINE COMPLETED SUCCESSFULLY");
    console.log("========================================");

}
catch(err){

    console.log("\n========================================");
    console.log(" PIPELINE FAILED");
    console.log("========================================");

    console.log("\nRollback will be executed.");

    process.exit(1);

}