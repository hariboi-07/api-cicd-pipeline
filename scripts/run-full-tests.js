const { execSync } = require("child_process");

console.log("\n====================================");
console.log(" Running Full Collection");
console.log("====================================\n");

try {

    execSync(
        `newman run "collections/API Sentinel - Layer7.postman_collection.json" -e "collections/API Sentinel - Layer7.postman_environment.json"`,
        {
            stdio: "inherit"
        }
    );

    console.log("\n✅ Full Collection PASSED");

    process.exit(0);

}
catch (err) {

    console.log("\n❌ Full Collection FAILED");

    process.exit(1);

}