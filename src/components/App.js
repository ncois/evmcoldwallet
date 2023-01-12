import Banner from "./Banner"
import Introduction from "./Introduction"
import Transfer from "./Transfer"
import { useState } from "react"
import TransferToken from "./TransferToken"

function App() {
	document.title = "Offline EVM Wallet"
	const [myPrivateKey, setMyPrivateKey] = useState("")
	const [isInitialized, setIsInitialized] = useState(false)
	const [chain, setChain] = useState(0)
	const [api, setApi] = useState("")
	const [blockExplorer, setBlockExplorer] = useState("")

	return 	(
		<div>
			<Banner myPrivateKey={myPrivateKey} setMyPrivateKey={setMyPrivateKey} 
						  setIsInitialized={setIsInitialized} chain={chain} setChain={setChain}
						  setApi={setApi} setBlockExplorer={setBlockExplorer}/>
			<Introduction myPrivateKey={myPrivateKey} setMyPrivateKey={setMyPrivateKey} 
						  isInitialized={isInitialized} setIsInitialized={setIsInitialized} chain={chain} />
			<Transfer myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} api={api} blockExplorer={blockExplorer}/>
			<TransferToken myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} api={api} blockExplorer={blockExplorer}/>
		</div>
	)	
	
}

export default App
