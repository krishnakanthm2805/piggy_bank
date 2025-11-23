import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "./scripts/accounts.js";
import "./scripts/check.js";
import "./scripts/deploy.js";
import "./scripts/check-hre.js";
import "./scripts/deploy.cjs";
import "./scripts/start-and-deploy.js";
dotenv.config();

export default {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    }
  }
};
