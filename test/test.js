require("dotenv").config();
const { ethers } = require("hardhat");

const FUNDRAISER_CONTRACT = "0x279636B044B83B9a6f4949eCFfE849a9cdc5E81f";
const ERC20_TOKEN_ADDRESS = "0xf102648D6aCa7F979D2cE08783B11dB8EDC9E9cC";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  const Fundraiser = await ethers.getContractAt(
    [
      "function donate(address token, uint256 amount) external",
      "function getDonors() external view returns (address[])",
      "function getDonation(address donor, address token) external view returns (uint256)",
    ],
    FUNDRAISER_CONTRACT,
    deployer
  );

  const ERC20 = await ethers.getContractAt(
    [
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function balanceOf(address account) external view returns (uint256)",
      "function transfer(address to, uint256 amount) external returns (bool)",
    ],
    ERC20_TOKEN_ADDRESS,
    deployer
  );

  const donationAmount = ethers.parseUnits("11", 18);

  console.log("Approving tokens...");
  const approveTx = await ERC20.approve(FUNDRAISER_CONTRACT, donationAmount);
  await approveTx.wait();
  console.log("Tokens approved!");

  console.log("Donating to Fundraiser...");
  const donateTx = await Fundraiser.donate(ERC20_TOKEN_ADDRESS, donationAmount);
  await donateTx.wait();
  console.log(`Donated ${ethers.formatUnits(donationAmount, 18)} tokens!`);

  console.log("Fetching donors...");
  const donors = await Fundraiser.getDonors();
  console.log("Donors:", donors);

  console.log("Fetching donation amount...");
  const donation = await Fundraiser.getDonation(deployer.address, ERC20_TOKEN_ADDRESS);
  console.log(`Your total donation: ${ethers.formatUnits(donation, 18)} tokens`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
