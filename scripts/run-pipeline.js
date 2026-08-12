const { execSync } = require("child_process");

console.log("\n==========================================");
console.log(" POSTMAN SMART VALIDATION PIPELINE");
console.log("==========================================");

try {

    console.log("\nSTEP 1 - Collection Intelligence");
    execSync("node scripts/collection-analyzer.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 2 - Auto Change Detection");
    execSync("node scripts/auto-change-detector.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 3 - Impact Analysis");
    execSync("node scripts/impact-analyzer.js \"Initiate Transaction\"", {
        stdio: "inherit"
    });

    console.log("\nSTEP 4 - Generate Smart Collection");
    execSync("node scripts/generate-collection.js \"Initiate Transaction\"", {
        stdio: "inherit"
    });

    console.log("\nSTEP 5 - Partial Validation");
    execSync("node scripts/run-temp-tests.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 6 - Full Regression");
    execSync("node scripts/run-full-tests.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 7 - Promote Collection");
    execSync("node scripts/promote.js", {
        stdio: "inherit"
    });

    console.log("\nSTEP 8 - Notify Team");
    execSync(
        'node scripts/notify.js SUCCESS "Initiate Transaction"',
        {
            stdio: "inherit"
        }
    );

    console.log("\n==========================================");
    console.log(" COLLECTION READY FOR PRODUCTION");
    console.log("==========================================");

}
catch (err) {

    console.log("\n==========================================");
    console.log(" VALIDATION FAILED");
    console.log("==========================================");

    console.log("\nGenerating Failure Report...");

    execSync("node scripts/failure-report.js", {
        stdio: "inherit"
    });

    console.log("\nExecuting Rollback...");

    execSync("node scripts/rollback.js", {
        stdio: "inherit"
    });

    console.log("\nSending Notification...");

    execSync(
        'node scripts/notify.js FAILED "Pipeline"',
        {
            stdio: "inherit"
        }
    );

    console.log("\n==========================================");
    console.log(" DEPLOYMENT BLOCKED");
    console.log("==========================================");
}