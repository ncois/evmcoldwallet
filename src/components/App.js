import Banner from "./Banner"
import Introduction from "./Introduction"
import Transfer from "./Transfer"
import { useState } from "react"

function App() {
	document.title = "Offline EVM Wallet"
	const [myPrivateKey, setMyPrivateKey] = useState("")
	const [isInitialized, setIsInitialized] = useState(false)
	const [chain, setChain] = useState(1)
	return 	(
		<div>
			<Banner myPrivateKey={myPrivateKey} setMyPrivateKey={setMyPrivateKey} 
						  setIsInitialized={setIsInitialized} chain={chain} setChain={setChain}/>
			<Introduction myPrivateKey={myPrivateKey} setMyPrivateKey={setMyPrivateKey} 
						  isInitialized={isInitialized} setIsInitialized={setIsInitialized} />
			<Transfer myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} />
		</div>
	)	
	
}

export default App
