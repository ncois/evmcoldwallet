import "../styles/Approve.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import QRCode from "react-qr-code"
import Warning from "./Warning"

function Approve({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [recipient, setRecipient] = useState('')
    const [token, setToken] = useState('')
    const [gasPrice, setGasPrice] = useState('')
    const [nonce, setNonce] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)
    const [txToAccept, setTxToAccept] = useState('')
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)
    

    const handleRecipientChange = event => {
        setRecipient(event.target.value)
    }
    const handleTokenChange = event => {
        setToken(event.target.value)
    }
    const handleGasPriceChange = event => {
        setGasPrice(event.target.value)
    }
    const handleNonceChange = event => {
        setNonce(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();

        // Check input format
        if (!ethers.utils.isAddress(recipient) || !ethers.utils.isAddress(token)) {
            alert('Invalid input format.')
        } else {
            const formData = {
                recipient, 
                token,
                gasPrice,
                nonce
            }
            processSubmittedDataFunction(formData);
            setRecipient('')
            setToken('')
            setGasPrice('')
            setNonce('')  
        }
    }

    async function processSubmittedDataFunction(formData) {
        
        const unsigned_tx = {
            chainId: parseInt(chain),
            to: formData.token,
            value: ethers.utils.parseEther("0"),
            gasPrice: formData.gasPrice*1e9,
            gasLimit: 300000,
            nonce: parseInt(formData.nonce),
            data: "0x095ea7b3000000000000000000000000" + recipient.substring(2) + "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        }
        
        setTxToAccept(unsigned_tx)
    
    }

    const resetText = () => {
        setText("")
    }

    useEffect(() => {
        text.length > 0 ? setVisible(true) : setVisible(false)
      }, [text]);

    return isInitialized ? (
    <div>
        <div className="evm-approve evm-columns">
            <div className="evm-columns">
            <p>Approve a spender for any ERC-20 compliant token.</p>
            </div>
            <form className="evm-columns" onSubmit={handleSubmit}>
                <label>
                    <input 
                    type="text" 
                    name="recipient"
                    value={recipient}
                    placeholder="Spender address"
                    onChange={handleRecipientChange}
                    />
                </label> <br></br>
                <label>
                    <input 
                    type="text" 
                    name="token"
                    value={token}
                    placeholder="Token address"
                    onChange={handleTokenChange}
                    />
                </label> <br></br>
                <label>
                    <input 
                    type="number" 
                    name="gasPrice"
                    value={gasPrice}
                    placeholder="Gas Price (GWei)"
                    onChange={handleGasPriceChange}
                    />
                </label> <br></br>
                <label>
                    <input 
                    type="number" 
                    name="nonce"
                    value={nonce}
                    placeholder="Nonce"
                    onChange={handleNonceChange}
                    />
                </label> <br></br>
                <input type="submit" value="Submit and sign" /> 
            </form>
        </div>
        <Warning txToAccept={txToAccept} setTxToAccept={setTxToAccept} confirmDialogVisible={confirmDialogVisible} setConfirmDialogVisible={setConfirmDialogVisible}
                  setText={setText} myPrivateKey={myPrivateKey} blockExplorer={blockExplorer} api={api}/>
        {visible ? 
            <div className="center" >
                <QRCode value={text} /> <br></br>
                <button onClick={resetText}>Hide QR</button>
            </div>
            
        : null}
    </div>
    ) : 
    (null)
}

export default Approve