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

    return !isInitialized ? (
        <div className= { classNames({
            "hidden": parseInt(chain) === 0,
         })}>
            <div className="evm-rectangle-large red">
                Copy paste your cold wallet private key:
                <input type="text" size="70" value={myPrivateKey} onChange={onChange} />
            </div>
        </div>
        
    ) : null
}

export default Introduction