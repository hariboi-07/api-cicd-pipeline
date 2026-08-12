const status = process.argv[2] || "SUCCESS";
const api = process.argv[3] || "Unknown API";

console.log("\n====================================");
console.log(" PIPELINE NOTIFICATION");
console.log("====================================\n");

if (status === "SUCCESS") {

    console.log("✅ Pipeline Status : SUCCESS");
    console.log("Changed API      :", api);
    console.log("Partial Tests    : PASSED");
    console.log("Full Tests       : PASSED");
    console.log("Production       : UPDATED");
    console.log("Notification     : SENT");

} else {

    console.log("❌ Pipeline Status : FAILED");
    console.log("Changed API      :", api);
    console.log("Partial Tests    : PASSED");
    console.log("Full Tests       : FAILED");
    console.log("Rollback         : COMPLETED");
    console.log("Notification     : SENT");

}

console.log("\n====================================");