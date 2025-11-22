require("dotenv").config();
// Ensure ethers plugin is loaded so `hre.ethers` is available in scripts
require("@nomicfoundation/hardhat-ethers");
// If you want the full toolbox, install and require '@nomicfoundation/hardhat-toolbox'
// require("@nomicfoundation/hardhat-toolbox");


const INFURA_KEY = process.env.INFURA_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY ? `0x${process.env.PRIVATE_KEY}` : undefined;


module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    // Localhost network (connect to a running `npx hardhat node`)
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: INFURA_KEY ? `https://sepolia.infura.io/v3/${INFURA_KEY}` : undefined,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
};
