import { QrReader } from "react-qr-reader"
import { useState } from "react"

function QrToClipboard() {

    const [startScan, setStartScan] = useState(false)

    const handleScan = async (scanData) => {
        if (scanData && scanData !== "") {
            navigator.clipboard.writeText(scanData.text)
            setStartScan(false)
        }
    }

    const handleError = (err) => {
        console.error(err);
    }

    return (
        <>
          <button type="button" className={startScan ? "evm-button bad" : "evm-button neutral"} onClick={() => {
            setStartScan(!startScan)
            }}>
            {startScan ? "Cancel" : "QR Scan To Clipboard"}
            </button>
            {startScan && (
            <>
            <QrReader
                delay={500}
                onError={handleError}
                onResult={handleScan}
                style={{ width: "300px" }}
            />
            </>
        )}
        </>
      )
}

export default QrToClipboard