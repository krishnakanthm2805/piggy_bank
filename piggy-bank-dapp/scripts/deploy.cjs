const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers;
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  const PiggyBankFactory = await ethers.getContractFactory("PiggyBank");
  const piggyBank = await PiggyBankFactory.connect(deployer).deploy(3600); // 1 hour lock

  if (typeof piggyBank.waitForDeployment === "function") {
    await piggyBank.waitForDeployment();
  } else if (piggyBank.deployed) {
    await piggyBank.deployed();
  }

  console.log("PiggyBank deployed to:", piggyBank.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
