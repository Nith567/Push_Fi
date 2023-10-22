/**
 *Submitted for verification at sepolia.scrollscan.com on 2023-10-17
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SimpleHelloWorld {

    string public greeting;

    function setGreeting(string memory _greeting) external {
        greeting = _greeting;
    }


    function getGreeting() external view returns (string memory) {
        return greeting;
    }
}