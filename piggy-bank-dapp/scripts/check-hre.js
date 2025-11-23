import hre from "hardhat";

async function main() {
  console.log("hre keys:", Object.keys(hre));
  console.log("hre.ethers defined:", typeof hre.ethers !== "undefined");
  try {
    const signers = await hre.ethers.getSigners();
    console.log("getSigners length:", signers.length);
    if (signers.length > 0) {
      console.log("first address:", await signers[0].getAddress());
    }
  } catch (err) {
    console.error("Error calling hre.ethers.getSigners():", err && err.stack ? err.stack : err);
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
