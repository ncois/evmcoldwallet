import { QrReader } from "react-qr-reader"

function QrScanner( {data, setData}) {

    return (
        <>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
              }
    
              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
          <p>{data}</p>
        </>
      );
}

export default QrScanner