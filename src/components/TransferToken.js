import "../styles/TransferToken.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import ShowQRCode from "./ShowQRCode"
import Warning from "./Warning"

function TransferToken({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [recipient, setRecipient] = useState('')
    const [token, setToken] = useState('')
    const [decimals, setDecimals] = useState('')
    const [amount, setAmount] = useState('')
    const [gasPrice, setGasPrice] = useState('')
    const [nonce, setNonce] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)
    const [txToAccept, setTxToAccept] = useState('')
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

    const handleRecipientChange = event => {
        setRecipient(event.target.value.replace(/\s/g, ''))
    }
    const handleTokenChange = event => {
        setToken(event.target.value.replace(/\s/g, ''))
    }
    const handleDecimalsChange = event => {
        setDecimals(event.target.value.replace(/\s/g, ''))
    }
    const handleAmountChange = event => { 
        setAmount(event.target.value.replace(/\s/g, ''))
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
        if (!ethers.utils.isAddress(recipient) || !ethers.utils.isAddress(token) || !(parseFloat(amount) > 0)) {
            alert('Invalid input format.')
        } else {
            const formData = {
                recipient, 
                token,
                decimals,
                amount, 
                gasPrice,
                nonce
            }
            processSubmittedDataFunction(formData);
            setRecipient('')
            setToken('')
            setDecimals('')
            setAmount('')
            setGasPrice('')
            setNonce('')  
        }
    }

    async function processSubmittedDataFunction(formData) {

        const txtAmount = (amount*10**(parseInt(formData.decimals))).toString(16).padStart(64, 0)
        
        if (txtAmount.length === 64 && isFinite(amount*10**(parseInt(formData.decimals)))) {
            const unsigned_tx = {
                chainId: parseInt(chain),
                to: formData.token,
                value: ethers.utils.parseEther("0"),
                gasPrice: formData.gasPrice*1e9,
                gasLimit: 300000,
                nonce: parseInt(formData.nonce),
                data: "0xa9059cbb000000000000000000000000" + recipient.substring(2) + txtAmount
            }
            
            setTxToAccept(unsigned_tx)

        } else {
            alert("Amount: overflow")
        }

    }

    useEffect(() => {
        text.length > 0 ? setVisible(true) : setVisible(false)
      }, [text]);

    return isInitialized ? (
    <div>
        <div className="evm-transfer-token evm-columns">
            <div className="evm-columns">
            <p>Transfer tokens.</p>
            <p>Warning: only ERC-20 compliant tokens</p>
            </div>
            <form className="evm-columns" onSubmit={handleSubmit}>
                <label>
                    <input 
                    type="text" 
                    name="recipient"
                    value={recipient}
                    placeholder="Recipient"
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
                    type="text" 
                    name="decimals"
                    value={decimals}
                    placeholder="Token decimals"
                    onChange={handleDecimalsChange}
                    />
                </label> <br></br>
                <label>
                    <input 
                    type="text" 
                    name="amount"
                    value={amount}
                    placeholder="Amount"
                    onChange={handleAmountChange}        
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
                <input className="evm-button good" type="submit" value="Submit" /> 
            </form>
        </div>
        <Warning txToAccept={txToAccept} setTxToAccept={setTxToAccept} confirmDialogVisible={confirmDialogVisible} setConfirmDialogVisible={setConfirmDialogVisible}
                  setText={setText} myPrivateKey={myPrivateKey} blockExplorer={blockExplorer} api={api}/>
        <ShowQRCode visible={visible} setVisible={setVisible} text={text} setText={setText} />
    </div>
    ) : 
    (null)
}

export default TransferToken