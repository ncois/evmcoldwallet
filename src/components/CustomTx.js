import "../styles/CustomTx.css"
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import ShowQRCode from "./ShowQRCode"
import Warning from "./Warning"
import del from '../assets/del.png'

function CustomTx({ myPrivateKey, isInitialized, chain, api, blockExplorer }) {

    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)
    const [txToAccept, setTxToAccept] = useState('')
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

    const [inputFields, setInputFields] = useState([{ 
        recipient: '', 
        value: '',
        gasPrice: '',
        gasLimit: '',
        nonce: '',
        func_sig: ''
        }
    ])

    const addNumber = () => {
        let newfield = { 
            type: 'number', 
            data: '' 
        }
        setInputFields([...inputFields, newfield])
    }
    
    const addAddress = () => {
        let newfield = { 
            type: 'address', 
            data: '' 
        }
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const handleFormChange = (index, event) => {
        
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value.replace(/\s/g, '');
        setInputFields(data);
    }

    const handleSubmit = event => {
        event.preventDefault()

        let data_is_correct = true
        let overflow = false
        for (let i = 0; i < inputFields.length; i++) {
            if (i === 0) {
                if (!ethers.utils.isAddress(inputFields[0].recipient) || (inputFields[0].func_sig[0] !== '0' || inputFields[0].func_sig[1] !== 'x' || inputFields[0].func_sig.length !== 10)) {
                    data_is_correct = false;
                }
            } else {
                if (inputFields[i].type === 'address') {
                    if (!ethers.utils.isAddress(inputFields[i].data)) {
                        data_is_correct = false;
                    }
                } 
            }
        }

        if (data_is_correct) {

            const formData = {
                recipient: inputFields[0].recipient,
                value: inputFields[0].value,
                gasPrice: inputFields[0].gasPrice,
                gasLimit: inputFields[0].gasLimit,
                nonce: inputFields[0].nonce,
                func_sig: inputFields[0].func_sig
            }

            for (let i = 1; i < inputFields.length; i++) {
                if (inputFields[i].type === 'address') {
                    formData.func_sig += inputFields[i].data.slice(2).padStart(64, 0)
                } else if (inputFields[i].type === 'number') {
                    let num = parseInt(inputFields[i].data).toString(16).padStart(64, 0)
                    if (num.length > 64) {
                        overflow = true
                    } else {
                        formData.func_sig += num
                    }
                }
            }
            
            if (!overflow) {
                processSubmittedDataFunction(formData)
                setInputFields([{
                    recipient: '',
                    value: '',
                    gasPrice: '',
                    gasLimit: '',
                    nonce: '',
                    func_sig: ''
                }])
            } else {
                alert('Overflow')
            }
        
        } else {
            alert('Invalid input format')
        }
    }
    
    function processSubmittedDataFunction(formData) {

        const unsigned_tx = {
            chainId: parseInt(chain),
            to: formData.recipient,
            value: ethers.utils.parseEther(formData.value),
            gasPrice: formData.gasPrice*1e9,
            gasLimit: parseInt(formData.gasLimit),
            nonce: parseInt(formData.nonce),
            data: formData.func_sig
        }

        setTxToAccept(unsigned_tx)
    
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
            </div> 
            <div className="evm-columns">
                <form onSubmit={handleSubmit}>
                    {inputFields.map((input, index) => {
                        if (index === 0) {
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
                                    <label>
                                        <input 
                                        type="text"
                                        name="func_sig"
                                        value={input.func_sig}
                                        placeholder="Function signature"
                                        onChange={event => handleFormChange(index, event)}
                                        />
                                    </label> <br></br>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index}>
                                    <label>
                                        <input
                                        type={input.type === 'number' ? 'number' : 'text'}
                                        name='data'
                                        value={input.data}
                                        placeholder={input.type === 'number' ? 'Param ' + index  + ': number': 'Param ' + index  + ': address'}
                                        onChange={event => handleFormChange(index, event)}
                                        />
                                    </label>
                                    <img src={del} width="10" className="evm-button" type="button" onClick={() => removeFields(index)}></img>
                                </div>
                            )
                        }
                    })}
                    <input className="evm-button good" type="submit" value="Submit" /> 
                    
                </form>
            </div>
            <div className="evm-columns">
                <button type="button" className="evm-button good" onClick={addAddress}>Add an address</button>
                <button type="button" className="evm-button good" onClick={addNumber}>Add a number</button>
            </div>
        </div>
        <Warning txToAccept={txToAccept} setTxToAccept={setTxToAccept} confirmDialogVisible={confirmDialogVisible} setConfirmDialogVisible={setConfirmDialogVisible}
                  setText={setText} myPrivateKey={myPrivateKey} blockExplorer={blockExplorer} api={api}/>
        <ShowQRCode text={text} setText={setText} visible={visible} setVisible={setVisible} />
    </div>
    ) : 
    (null)
}

export default CustomTx