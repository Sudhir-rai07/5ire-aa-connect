const { error } = require("console");
const hre = require("hardhat");

async function main() {
const [deployer] = await hre.ethers.getSigners();
console.log("Deploying contract with account: ", deployer.address)

const Fundraiser = await hre.ethers.getContractFactory("Fundraiser")
const fundraiser = await Fundraiser.deploy(deployer.address)
await fundraiser.waitForDeployment();

console.log("Fundraiser deployed at : ", await fundraiser.getAddress())
}

main()
      .then(()=> process.exit(0))
      .catch((err)=> {
          console.log(error)
          process.exit(1)
        })


        // 0x2890Fc3166eb890fd1Aa9aC13cF6b10B04bD2787