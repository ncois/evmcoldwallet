import "../styles/Banner.css"
import { chainList } from "../datas/chains"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"

function ChainSelection({ chain, setChain }) {

    function handleChain(id) {
        setChain(id)
        console.log(chain)
    }

    return (
    <div className="evm-banner">
        <div className="topContainer evm-columns">
			{chainList.map(({ id, cover, name }) =>
					
						<div key={id}>
                            <img onClick={() => handleChain(id)} height={chain === id ? "60" : "40"} src={cover} alt={`${name} cover`} />
						</div>
				)}
		</div>
    </div>
    )
}

export default ChainSelection