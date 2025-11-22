import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with:", await deployer.getAddress());

  const PiggyBankFactory = await ethers.getContractFactory("PiggyBank");
  const piggyBank = await PiggyBankFactory.connect(deployer).deploy(3600); // 1 hour lock

  if (typeof piggyBank.waitForDeployment === "function") {
    await piggyBank.waitForDeployment();
  } else if (piggyBank.deployed) {
    await piggyBank.deployed();
  }

  console.log("PiggyBank deployed to:", piggyBank.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
