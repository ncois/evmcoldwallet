import Banner from "./Banner"
import Introduction from "./Introduction"
import Transfer from "./Transfer"
import { useState } from "react"
import TransferToken from "./TransferToken"
import Approve from "./Approve"
import MintVenus from "./MintVenus"
import RedeemVenus from "./RedeemVenus"

function App() {
	document.title = "Offline EVM Wallet"
	const [myPrivateKey, setMyPrivateKey] = useState("")
	const [isInitialized, setIsInitialized] = useState(false)
	const [chain, setChain] = useState(0)
	const [api, setApi] = useState("")
	const [blockExplorer, setBlockExplorer] = useState("")
	const [myWallet, setMyWallet] = useState("")

	return 	(
		<div>
			<Banner myPrivateKey={myPrivateKey} setMyPrivateKey={setMyPrivateKey} 
						  setIsInitialized={setIsInitialized} chain={chain} setChain={setChain}
						  setApi={setApi} setBlockExplorer={setBlockExplorer}
						  myWallet={myWallet} setMyWallet={setMyWallet}/>
			<Introduction myPrivateKey={myPrivateKey} setMyPrivateKey={setMyPrivateKey} 
						  isInitialized={isInitialized} setIsInitialized={setIsInitialized} chain={chain} />
			<Transfer myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} api={api} blockExplorer={blockExplorer}/>
			<TransferToken myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} api={api} blockExplorer={blockExplorer}/>
			<Approve myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} api={api} blockExplorer={blockExplorer}/>
			<MintVenus myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} api={api} blockExplorer={blockExplorer}/>
			<RedeemVenus myPrivateKey={myPrivateKey} isInitialized={isInitialized} chain={chain} api={api} blockExplorer={blockExplorer}/>		
		</div>
	)	
	
}

export default App
