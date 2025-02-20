import { ethers } from "ethers";

const FUNDRAISER_CONTRACT = "0x279636B044B83B9a6f4949eCFfE849a9cdc5E81f";

const fundraiserAbi = [
    "function donate(address token, uint256 amount) external",
    "function getDonors() external view returns (address[])",
    "function getDonation(address donor, address token) external view returns (uint256)",
    "function withdraw(address token) external"
];

const erc20Abi = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
];

export const getProviderAndSigner = async () => {
    if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask is not installed!");
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
};

export const getFundraiserContract = async (signer) => {
    return new ethers.Contract(FUNDRAISER_CONTRACT, fundraiserAbi, signer);
};

export const getErc20Contract = async (signer, ERC20_TOKEN_ADDRESS) => {
    return new ethers.Contract(ERC20_TOKEN_ADDRESS, erc20Abi, signer);
};

export const withdraw = async (signer) => {
    return new ethers.Contract(FUNDRAISER_CONTRACT, fundraiserAbi, signer)
}
