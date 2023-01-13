import "../styles/TransferToken.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import QRCode from "react-qr-code"

function TransferToken({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [recipient, setRecipient] = useState('')
    const [token, setToken] = useState('')
    const [decimals, setDecimals] = useState('')
    const [amount, setAmount] = useState('')
    const [gasPrice, setGasPrice] = useState('')
    const [nonce, setNonce] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    const handleRecipientChange = event => {
        setRecipient(event.target.value)
    }
    const handleTokenChange = event => {
        setToken(event.target.value)
    }
    const handleDecimalsChange = event => {
        setDecimals(event.target.value)
    }
    const handleAmountChange = event => { 
        setAmount(event.target.value)
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

        let signer
        try {
            signer = new ethers.Wallet(myPrivateKey)
        } catch {}

        const txtAmount = (amount*10**(parseInt(formData.decimals))).toString(16).padStart(64, 0)
        
        if (txtAmount.length === 64) {
            const unsigned_tx = {
                chainId: parseInt(chain),
                to: formData.token,
                value: ethers.utils.parseEther("0"),
                gasPrice: formData.gasPrice*1e9,
                gasLimit: 300000,
                nonce: parseInt(formData.nonce),
                data: "0xa9059cbb000000000000000000000000" + recipient.substring(2) + txtAmount
            }
            
            const signed_tx = await signer.signTransaction(unsigned_tx)
            setText("https://api." + blockExplorer + "/api?module=proxy&action=eth_sendRawTransaction&hex=" + signed_tx + "&apikey=" + api)
        } else {
            alert("Amount: overflow")
            resetText()
        }

    }

    const resetText = () => {
        setText("")
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
                <input type="submit" value="Submit and sign" /> 
            </form>
        </div>
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

export default TransferToken