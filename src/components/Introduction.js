import "../styles/Introduction.css"
import "../styles/Global.css"
import classNames from "classnames";

function Introduction({ myPrivateKey, setMyPrivateKey, isInitialized, setIsInitialized, chain }) {

    const onChange = (event) => {
        if (event.target.value.length === 64) {
            setMyPrivateKey(event.target.value);
            setIsInitialized(true)
        }
        else {
            alert("The text you pasted is not 64 characters long")
        }
    }

    function restart() {
        setIsInitialized(false)
        setMyPrivateKey("")
    }

    function showPK() {
		console.log(myPrivateKey)
	}

    return !isInitialized ? (
        <div className= { classNames({
            "hidden": parseInt(chain) === 0,
         })}>
            <div className="evm-rectangle-red">
                Copy paste your cold wallet private key:
                <input type="text" size="70" value={myPrivateKey} onChange={onChange} />
            </div>
        </div>
        
    ) : 
    (
        <div>
            <div className="evm-rectangle-green">
                The private key is correct, you can sign transactions.
                <div>
                    <button className="evm-button-bad" onClick={restart}>Enter another key</button>
                    <button className="evm-button-good" onClick={showPK}>Show key in console</button>
                </div>
            </div>
        </div>
    )
}

export default Introduction