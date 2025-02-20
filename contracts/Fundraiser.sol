// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fundraiser is Ownable {
    using SafeERC20 for IERC20;

    struct Donation {
        uint256 totalAmount;
        bool exists;
    }

    mapping(address => mapping(address => Donation)) private donations; 
    address[] private donors;
    mapping(address => bool) private donorExists;

    event DonationReceived(
        address indexed donor,
        address indexed token,
        uint256 amount
    );
    event FundsWithdrawn(
        address indexed owner,
        address indexed token,
        uint256 amount
    );

    constructor(address owner) Ownable(owner) {}

    function donate(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        if (!donations[msg.sender][token].exists) {
            donations[msg.sender][token].exists = true;
        }
        donations[msg.sender][token].totalAmount += amount;

        if (!donorExists[msg.sender]) {
            donorExists[msg.sender] = true;
            donors.push(msg.sender);
        }

        emit DonationReceived(msg.sender, token, amount);
    }

    function withdraw(address token) external onlyOwner {
        uint256 amount = IERC20(token).balanceOf(address(this));
        require(amount > 0, "No funds to withdraw");

        IERC20(token).safeTransfer(owner(), amount);
        emit FundsWithdrawn(owner(), token, amount);
    }

    function getDonors() external view returns (address[] memory) {
        return donors;
    }

    function getDonation(
        address donor,
        address token
    ) external view returns (uint256) {
        return donations[donor][token].totalAmount;
    }
}
