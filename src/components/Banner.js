import "../styles/Banner.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"

function Banner({ myPrivateKey, setMyPrivateKey, setIsInitialized }) {
    const [myWallet, setMyWallet] = useState("")

    useEffect(() => {
        if (myPrivateKey.length > 0) {
            try {
                const add = (new ethers.Wallet(myPrivateKey)).address
                setMyWallet(add)
            }
            catch (e) {
                alert(e)
                setIsInitialized(false)
                setMyPrivateKey("")
            }
        } else {
            setMyWallet("")
        }
    }, [myPrivateKey])

    return (
    <div className="evm-banner">
        <div className="evm-columns left">Offline EVM Wallet</div>
        <div className="evm-columns right adapt">
            {myWallet === "" ? 
            (<div>No wallet connected</div>):
            (<div>{myWallet}</div>)}
        </div>
    </div>
    )
}

export default Banner