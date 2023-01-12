import "../styles/Transfer.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"

function Transfer({ myPrivateKey, isInitialized, chain }) {

    let signer
    try {
        signer = new ethers.Wallet(myPrivateKey)
    } catch {}

    let unsigned_tx = {
        chainId: chain,
        to: "TBD",
        ///value: ethers.utils.parseEther("TBD"),
        gasPrice: "TBD",
        gasLimit: 100000,
        nonce: "TBD",
        data: ""
      }

    return isInitialized ? (
    <div className="evm-transfer">
        Transfer Ether.

    </div>
    ) : 
    (null)
}

export default Transfer