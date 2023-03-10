import "../styles/Approve.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import ShowQRCode from "./ShowQRCode"
import QrScanner from "./QrScanner"
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

    useEffect(() => {
        text.length > 0 ? setVisible(true) : setVisible(false)
      }, [text]);

    return isInitialized ? (
    <div>
        <div className="evm-rectangle red-fonce evm-columns">
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
                </label> <QrScanner setData={setRecipient} /> <br></br>
                <label>
                    <input 
                    type="text" 
                    name="token"
                    value={token}
                    placeholder="Token address"
                    onChange={handleTokenChange}
                    />
                </label> <QrScanner setData={setToken} /> <br></br>
                <label>
                    <input 
                    type="number" 
                    name="gasPrice"
                    value={gasPrice}
                    max="100"
                    placeholder="Gas Price (GWei)"
                    onChange={handleGasPriceChange}
                    />
                </label> <br></br>
                <label>
                    <input 
                    type="number" 
                    name="nonce"
                    value={nonce}
                    max="115792089237316195423570985008687907853269984665640564039457584007913129639935"
                    placeholder="Nonce"
                    onChange={handleNonceChange}
                    />
                </label> <br></br>
                <input className="evm-button good" type="submit" value="Submit" /> 
            </form>
        </div>
        <Warning txToAccept={txToAccept} setTxToAccept={setTxToAccept} confirmDialogVisible={confirmDialogVisible} setConfirmDialogVisible={setConfirmDialogVisible}
                  setText={setText} myPrivateKey={myPrivateKey} blockExplorer={blockExplorer} api={api}/>
        <ShowQRCode text={text} setText={setText} visible={visible} setVisible={setVisible}/>
    </div>
    ) : 
    (null)
}

export default Approve