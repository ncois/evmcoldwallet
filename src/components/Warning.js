import "../styles/Warning.css"
import { useEffect } from 'react'
import { ethers } from "ethers"

function Warning({ txToAccept, setTxToAccept, confirmDialogVisible, setConfirmDialogVisible, setText, myPrivateKey, blockExplorer, api}) {

    const signTx = () => {

        let signer
        try {
            signer = new ethers.Wallet(myPrivateKey)
        } catch {}

        signer.signTransaction(txToAccept).then((signed_tx) => {
            setText("https://api." + blockExplorer + "/api?module=proxy&action=eth_sendRawTransaction&hex=" + signed_tx + "&apikey=" + api)
            resetTxToAccept()
        })
    }

    const resetTxToAccept = () => {
        setTxToAccept('')
    }

    useEffect(() => {
        txToAccept !== '' ? setConfirmDialogVisible(true) : setConfirmDialogVisible(false)
    }, [txToAccept]);

	return 	(
		<div>
			{confirmDialogVisible ? 
            <div className="center" >
                {txToAccept !== '' ? 
                    <div className="evm-warning">
                        <p>Do you want to sign this transaction?</p>
                        <div className="left">
                        <p>Recipient: {txToAccept.to}</p>
                        <p>Value: {ethers.utils.formatEther(txToAccept.value)} ETH</p>
                        <p>Gas Price: {txToAccept.gasPrice*1e-9} GWei</p>
                        <p>Gas Limit: {txToAccept.gasLimit}</p>
                        <p>Nonce: {txToAccept.nonce}</p>
                        <p>Data: {txToAccept.data}</p>
                        </div>
                        <button onClick={signTx}>Sign</button>
                        <button onClick={resetTxToAccept}>Cancel</button>
                    </div> : null}
            </div>
        : null}
		</div>
	)	
	
}

export default Warning
