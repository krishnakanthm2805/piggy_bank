import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const PiggyBank = await ethers.getContractFactory("PiggyBank");
  const piggyBank = await PiggyBank.deploy();

  await piggyBank.waitForDeployment();
  console.log("PiggyBank deployed at:", await piggyBank.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
