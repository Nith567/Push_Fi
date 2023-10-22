// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "erc721a/contracts/ERC721A.sol";

contract MNT is ERC721A {
    constructor() ERC721A("MNT_NFT", "MNT") {}

    function mint(uint256 quantity) external payable {
        _mint(msg.sender, quantity);
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return "ipfs://bafybeicgv2uvr57sijnmha6zyxnhpqguqfllho2oqlioptllqivq5fyulm";
    }
}