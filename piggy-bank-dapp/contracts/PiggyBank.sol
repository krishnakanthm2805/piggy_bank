// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract PiggyBank {
    address public owner;
    uint256 public balance;
    uint256 public unlockTime; // timestamp when withdrawal is allowed


    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event TimeLockSet(uint256 unlockTime);


    constructor(uint256 _lockDurationInSeconds) {
        owner = msg.sender;
        unlockTime = block.timestamp + _lockDurationInSeconds;
        emit TimeLockSet(unlockTime);
    }


    function deposit() external payable {
        require(msg.value > 0, "Deposit must be > 0");
        balance += msg.value;
        emit Deposited(msg.sender, msg.value);
    }


    function withdraw(uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(block.timestamp >= unlockTime, "Funds are locked!");
        require(amount <= balance, "Insufficient balance");


        balance -= amount;
        payable(owner).transfer(amount);


        emit Withdrawn(owner, amount);
    }


    function getBalance() external view returns (uint256) {
        return balance;
    }


    function getUnlockTime() external view returns (uint256) {
        return unlockTime;
    }


    function isUnlocked() external view returns (bool) {
        return block.timestamp >= unlockTime;
    }
}
