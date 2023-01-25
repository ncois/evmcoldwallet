import "../styles/Banner.css"
import { useEffect } from 'react'
import { ethers } from "ethers"
import { chainList } from "../datas/chains"
import classNames from "classnames";

function Banner({ myPrivateKey, setMyPrivateKey, setIsInitialized, chain, setChain, setApi, setBlockExplorer, myWallet, setMyWallet }) {

    useEffect(() => {
        if (myPrivateKey.length > 0) {
            try {
                const add = (new ethers.Wallet(myPrivateKey)).address
                setMyWallet(add)
            }
            catch (e) {
                alert("Error while initializing wallet: " + e.message)
                setIsInitialized(false)
                setMyPrivateKey("")
            }
        } else {
            setMyWallet("")
        }
    }, [myPrivateKey])

    function handleChain(id, api, blockExplorer) {
        setChain(id)
        setApi(api)
        setBlockExplorer(blockExplorer)
    }

    return (
    <div 
        className= { classNames({
           'evm-banner': true,
           'eth': parseInt(chain) === 1,
           'bnb': parseInt(chain) === 56
        })}>
        <div className="evm-columns left">Offline EVM Wallet</div>
        <div className="topContainer">
			{chainList.map(({ id, cover, name, api, blockExplorer }) =>
					
						<div key={id}>
                            <img onClick={() => handleChain(id, api, blockExplorer)} height={chain === id ? "60" : "40"} src={cover} alt={`${name} cover`} />
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