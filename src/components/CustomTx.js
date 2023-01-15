import "../styles/CustomTx.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import QRCode from "react-qr-code"

function CustomTx({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [recipient, setRecipient] = useState('')
    const [value, setValue] = useState('')
    const [gasPrice, setGasPrice] = useState('')
    const [gasLimit, setGasLimit] = useState('')
    const [nonce, setNonce] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    const handleRecipientChange = event => {
        setRecipient(event.target.value)
    }
    const handleValueChange = event => { 
        setValue(event.target.value)
    }
    const handleGasPriceChange = event => {
        setGasPrice(event.target.value)
    }
    const handleGasLimitChange = event => {
        setGasLimit(event.target.value)
    }
    const handleNonceChange = event => {
        setNonce(event.target.value)
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
                gasLimit,
                nonce
            }
            processSubmittedDataFunction(formData);
            setRecipient('')
            setValue('')
            setGasPrice('')
            setGasLimit('')
            setNonce('')  
        }
    }
    
    async function processSubmittedDataFunction(formData) {

        let signer
        try {
            signer = new ethers.Wallet(myPrivateKey)
        } catch {}

        const unsigned_tx = {
            chainId: parseInt(chain),
            to: formData.recipient,
            value: ethers.utils.parseEther(formData.value),
            gasPrice: formData.gasPrice*1e9,
            gasLimit: formData.gasLimit,
            nonce: parseInt(formData.nonce)
        }
        
        const signed_tx = await signer.signTransaction(unsigned_tx)
        setText("https://api." + blockExplorer + "/api?module=proxy&action=eth_sendRawTransaction&hex=" + signed_tx + "&apikey=" + api)

    }

    const resetText = () => {
        setText("")
    }

    useEffect(() => {
        text.length > 0 ? setVisible(true) : setVisible(false)
    }, [text]);

    // create a sizable form for the data of the tx (the user should be able to add as many fields as he wants)
    // function name
    // function param1
    // function param2 
    // ...
    // function paramN

    return isInitialized ? (
    <div>
        <div className="evm-custom-tx">
            <div className="evm-columns">
                <p>Use this to create custom transactions.</p>
                <p>Address and uint types are supported</p>
                <p>WARNING: no data verification is processed, check the correctness of what is typed</p>
                </div> 
            <form className="evm-columns" onSubmit={handleSubmit}>
                <label>
                    <input 
                    type="text" 
                    name="recipient"
                    value={recipient}
                    placeholder="Recipient (To)"
                    onChange={handleRecipientChange}
                    />
                </label> <br></br>
                <label>
                    <input 
                    type="text" 
                    name="value"
                    value={value}
                    placeholder="Value of the tx"
                    onChange={handleValueChange}        
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
                    name="gasLimit"
                    value={gasLimit}
                    placeholder="Gas Limit"
                    onChange={handleGasLimitChange}
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

export default CustomTx