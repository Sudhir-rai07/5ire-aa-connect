const hre = require("hardhat");

async function main() {
  const Fundraiser = await hre.ethers.getContractFactory("Fundraiser");
  const fundraiser = await Fundraiser.deploy("0xDA8F0764C6c079a12BE61A8f971F7145c79841e9");

  await fundraiser.waitForDeployment();
  console.log("Fundraiser deployed to:", fundraiser.target);
  //Contract Deployed On : 0x279636B044B83B9a6f4949eCFfE849a9cdc5E81f
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
