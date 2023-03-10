import "../styles/RedeemVenus.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import ShowQRCode from "./ShowQRCode"
import QrScanner from "./QrScanner"
import Warning from "./Warning"

function RedeemVenus({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [recipient, setRecipient] = useState('')
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
        if (!ethers.utils.isAddress(recipient) || !(parseFloat(amount) > 0)) {
            alert('Invalid input format.')
        } else {
            const formData = {
                recipient, 
                decimals,
                amount, 
                gasPrice,
                nonce
            }
            processSubmittedDataFunction(formData);
            setRecipient('')
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
                to: formData.recipient,
                value: ethers.utils.parseEther("0"),
                gasPrice: formData.gasPrice*1e9,
                gasLimit: 500000,
                nonce: parseInt(formData.nonce),
                data: "0x852a12e3" + txtAmount
            }
            
            setTxToAccept(unsigned_tx)

        } else {
            alert("Amount: overflow")
        }

    }

    useEffect(() => {
        text.length > 0 ? setVisible(true) : setVisible(false)
      }, [text]);

    return (isInitialized && parseInt(chain) === 56) ? (
    <div>
        <div className="evm-rectangle yellow evm-columns">
            <div className="evm-columns adapt">
            <p>Redeem (withdraw) tokens on app.venus.io.</p>
            </div>
            <form className="evm-columns" onSubmit={handleSubmit}>
                <label>
                    <input 
                    type="text" 
                    name="recipient"
                    value={recipient}
                    placeholder="Venus protocol (To)"
                    onChange={handleRecipientChange}
                    />
                </label> <QrScanner setData={setRecipient} /> <br></br>
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
        <ShowQRCode visible={visible} setVisible={setVisible} text={text} setText={setText}/>
    </div>
    ) : 
    (null)
}

export default RedeemVenus