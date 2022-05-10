import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {

    const [startwatch, setStartwatch] = useState(false)
    const [account, setAccount] = useState(null)
    const [mnemonic, setMnemonic] = useState(null)
    const [balance, setBalance] = useState(null)
  const loadAccount = async () => {
    if(mnemonic.length > 0){
      setStartwatch(true)
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.requestAccounts()
      console.log(accounts)
      const create = web3.eth.accounts.create()
      console.log(create)
      let account = accounts.length > 0 ? accounts[0] : null
      const balance = await web3.eth.getBalance(account)
      setAccount(account)
      setBalance(balance)
      const network = web3.eth.accounts.wallet.add(create.privateKey)
    }
  }


  useEffect(() => {
    if(startwatch){
        loadAccount()
    }
  }, [account,balance])
  
  return (
    <div className="App">
      <textarea onChange={(e)=> setMnemonic(e.target.value)} rows="4" cols="50"></textarea>
      <div>
        <button onClick={loadAccount}>Get Account</button>
      </div>
      <div className='row'>
        <div className='box'>Account: {account} </div>
        <div className='box'>Balance: {balance} </div>
      </div>
    </div>
  );
}

export default App;
