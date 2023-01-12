import "../styles/Banner.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { chainList } from "../datas/chains"
import classNames from "classnames";

function Banner({ myPrivateKey, setMyPrivateKey, setIsInitialized, chain, setChain }) {
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

    function handleChain(id) {
        setChain(id)
        console.log(chain)
    }

    return (
    <div 
        className= { classNames({
           'evm-banner': true,
           'eth': chain == 1,
           'bnb': chain == 56
        })}>
        <div className="evm-columns left">Offline EVM Wallet</div>
        <div className="topContainer">
			{chainList.map(({ id, cover, name }) =>
					
						<div key={id}>
                            <img onClick={() => handleChain(id)} height={chain === id ? "60" : "40"} src={cover} alt={`${name} cover`} />
						</div>
				)}
		</div>
        <div className="evm-columns right adapt">
            {myWallet === "" ? 
            (<div>No wallet connected</div>):
            (<div className="small">{myWallet}</div>)}
        </div>
    </div>
    )
}

export default Banner