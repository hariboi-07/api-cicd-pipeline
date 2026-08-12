const { execSync } = require("child_process");

console.log("\n====================================");
console.log(" Running Changed APIs");
console.log("====================================\n");

try {

    execSync(
        `newman run "collections/temp-collection.json" -e "collections/API Sentinel - Layer7.postman_environment.json"`,
        {
            stdio: "inherit"
        }
    );

    console.log("\n✅ Changed APIs PASSED");

    process.exit(0);

}
catch (err) {

    console.log("\n❌ Changed APIs FAILED");

    process.exit(1);

}