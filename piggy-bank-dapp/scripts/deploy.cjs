const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); // get signer account

  console.log("Deploying contracts with:", deployer.address);

  const PiggyBank = await hre.ethers.getContractFactory("PiggyBank"); // get contract factory
  const piggyBank = await PiggyBank.deploy(); // deploy contract

  await piggyBank.deployed();

  console.log("PiggyBank deployed to:", piggyBank.address);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
