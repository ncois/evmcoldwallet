import QRCode from "react-qr-code"
import "../styles/Global.css"
import { useEffect } from 'react'


function ShowQRCode({ text, setText, visible, setVisible }) {
	
    const resetText = () => {
        setText("")
    }

    useEffect(() => {
        text.length > 0 ? setVisible(true) : setVisible(false)
      }, [text]);

	return 	(
		<div>
            {visible ? 
            <div className="center" >
                <QRCode value={text} /> <br></br>
                <button className="evm-button-good" onClick={resetText}>Hide QR</button>
            </div>
            
        : null}
		</div>
	)	
	
}

export default ShowQRCode
