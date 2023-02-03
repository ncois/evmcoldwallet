import "../styles/Transfer.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import ShowQRCode from "./ShowQRCode"
import Warning from "./Warning"
import QrScanner from "./QrScanner"

function Transfer({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [recipient, setRecipient] = useState('')
    const [value, setValue] = useState('')
    const [gasPrice, setGasPrice] = useState('')
    const [nonce, setNonce] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)
    const [txToAccept, setTxToAccept] = useState('')
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

    const handleRecipientChange = event => {
        setRecipient(event.target.value.replace(/\s/g, ''))
    }
    const handleValueChange = event => { 
        setValue(event.target.value.replace(/\s/g, ''))
    }
    const handleGasPriceChange = event => {
        setGasPrice(event.target.value.replace(/\s/g, ''))
    }
    const handleNonceChange = event => {
        setNonce(event.target.value.replace(/\s/g, ''))
    }

    const handleSubmit = event => {
        event.preventDefault();

        // Check input format
        if (!ethers.utils.isAddress(recipient) || !(parseFloat(value) > 0)) {
            alert('Invalid input format.')
        } else {
            const formData = {
                recipient, 
                value, 
                gasPrice,
                nonce
            
            }
            processSubmittedDataFunction(formData);
            setRecipient('')
            setValue('')
            setGasPrice('')
            setNonce('')  
        }
    }

    async function processSubmittedDataFunction(formData) {

        const unsigned_tx = {
            chainId: parseInt(chain),
            to: formData.recipient,
            value: ethers.utils.parseEther(formData.value),
            gasPrice: formData.gasPrice*1e9,
            gasLimit: 21000,
            nonce: parseInt(formData.nonce)
        }

        setTxToAccept(unsigned_tx)
    
    }

    useEffect(() => {
        text.length > 0 ? setVisible(true) : setVisible(false)
      }, [text]);

    return isInitialized ? (
    <div>
        <div className="evm-rectangle cyan">
            <p className="evm-columns">Transfer Ether.</p>
            <form className="evm-columns" onSubmit={handleSubmit}>
                <label>
                    <input 
                    type="text" 
                    name="recipient"
                    value={recipient}
                    placeholder="Recipient"
                    onChange={handleRecipientChange}
                    />
                </label> <QrScanner setData={setRecipient} /> <br></br>
                <label>
                    <input 
                    type="text" 
                    name="value"
                    value={value}
                    placeholder="Value"
                    onChange={handleValueChange}        
                    />
                </label>
                <label>
                    <input 
                    type="number" 
                    name="gasPrice"
                    value={gasPrice}
                    max="100"
                    placeholder="Gas Price (GWei)"
                    onChange={handleGasPriceChange}
                    />
                </label> 
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

export default Transfer