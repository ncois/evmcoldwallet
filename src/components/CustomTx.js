import "../styles/CustomTx.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import QRCode from "react-qr-code"

function CustomTx({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    const [inputFields, setInputFields] = useState([{ 
        recipient: '', 
        value: '',
        gasPrice: '',
        gasLimit: '',
        nonce: ''
        }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const handleSubmit = event => {
        event.preventDefault();

        // Check input format
        if (!ethers.utils.isAddress(inputFields[0].recipient) || !(parseFloat(inputFields[0].value) > 0)) {
            alert('Invalid input format.')
        } else {
            const formData = {
                recipient: inputFields[0].recipient,
                value: inputFields[0].value,
                gasPrice: inputFields[0].gasPrice,
                gasLimit: inputFields[0].gasLimit,
                nonce: inputFields[0].nonce
            }
            processSubmittedDataFunction(formData);
            setInputFields([{
                recipient: '',
                value: '',
                gasPrice: '',
                gasLimit: '',
                nonce: ''
            }])
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
            gasLimit: parseInt(formData.gasLimit),
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

    return isInitialized ? (
    <div>
        <div className="evm-custom-tx">
            <div className="evm-columns">
                <p>Use this to create custom transactions.</p>
                <p>Address and uint types are supported</p>
                <p>WARNING: no data verification is processed, check the correctness of what is typed</p>
            </div> 
            <div className="evm-columns">
                <form onSubmit={handleSubmit}>
                    {inputFields.map((input, index) => {
                        return (
                        <div key={index}>
                            <label>
                                <input 
                                type="text" 
                                name="recipient"
                                value={input.recipient}
                                placeholder="Recipient (To)"
                                onChange={event => handleFormChange(index, event)}
                                />
                            </label> <br></br>
                            <label>
                                <input 
                                type="text" 
                                name="value"
                                value={input.value}
                                placeholder="Value of the tx"
                                onChange={event => handleFormChange(index, event)}        
                                />
                            </label> <br></br>
                            <label>
                                <input 
                                type="number" 
                                name="gasPrice"
                                value={input.gasPrice}
                                placeholder="Gas Price (GWei)"
                                onChange={event => handleFormChange(index, event)}
                                />
                            </label> <br></br>
                            <label>
                                <input 
                                type="number" 
                                name="gasLimit"
                                value={input.gasLimit}
                                placeholder="Gas Limit"
                                onChange={event => handleFormChange(index, event)}
                                />
                            </label> <br></br>
                            <label>
                                <input 
                                type="number" 
                                name="nonce"
                                value={input.nonce}
                                placeholder="Nonce"
                                onChange={event => handleFormChange(index, event)}
                                />
                            </label> <br></br>
                            <input type="submit" value="Submit and sign" /> 
                        </div>
                        )
                    })}
                </form>
            </div>
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