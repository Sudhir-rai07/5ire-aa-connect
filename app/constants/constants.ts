import { ethers } from "ethers"
import abi from '../abis/Factory.json'

export const CONTRACT_ADDRESS = "0x2890Fc3166eb890fd1Aa9aC13cF6b10B04bD2787"
export const fundraiserContract = async (signer: ethers.JsonRpcSigner) => {
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
}