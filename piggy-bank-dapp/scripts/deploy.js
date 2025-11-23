import hre from "hardhat";

async function main() {
  const { ethers } = hre;

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const PiggyBank = await ethers.getContractFactory("PiggyBank");
  const piggyBank = await PiggyBank.deploy(3600);

  await piggyBank.waitForDeployment();

  console.log("PiggyBank deployed at:", await piggyBank.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
