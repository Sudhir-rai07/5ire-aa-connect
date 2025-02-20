require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    fiveire: {
      url: "https://rpc.testnet.5ire.network",
      accounts: [process.env.WALLET_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.FIVEIRE_API_KEY,
  },
};