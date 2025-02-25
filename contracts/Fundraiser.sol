// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fundraiser is Ownable {

    mapping(address => uint256) public donations;
    address[] public donors;
    mapping(address => bool) private hasDonated;

    event DonationReveived(address indexed _donor, uint256 _amount);
    event FundsWithdrawn(address indexed _owner, uint256 _amount);
        
    constructor(address owner) Ownable(owner) { } // Constructor to set the owner address) {}


    // Donte native token
    function donate() external payable {
        require(msg.value > 0, "Donation must be greater than 0");
        donations[msg.sender] += msg.value;

        if(!hasDonated[msg.sender]){
            hasDonated[msg.sender] = true;
            donors.push(msg.sender);
        }

        emit DonationReveived(msg.sender, msg.value);
    }

    // Withdraw funds: onlyOwner
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success,) = owner().call{value: balance}("");
        require(success, "Withdraw Failed");
        emit  FundsWithdrawn(owner(), balance);
    }

    // Get donors
    function getDonors() external view returns(address[] memory){
        return donors;
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
   
}