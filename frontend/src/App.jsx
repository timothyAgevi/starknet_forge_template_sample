import React from 'react'
import {Contract,Account,Provider}from 'starknet';
import { abi } from './assets/abi.json';


const PRIVATE_KEY="0xef924878d5c6e935c40549d5f089241c"
const ACCOUNT_ADDRESS="0x2921b7e57b01d61de121d0799ea57f2dc2297c47e2776aa3e2f90196e4ed3ce"
const CONTRACT_ADDRESS="0x195093acce549270c549c00296ad6c6a50acef027f472dd88fbe7e64b30e918"//remax zero after x

const provider=new Provider({rpc :{nodeUrl:"http://0.0.0.0:5050/rpc"}})
const account =new Account(provider,ACCOUNT_ADDRESS,PRIVATE_KEY)
const contract=new Contract(abi,CONTRACT_ADDRESS,account);

function App() {
  async function callContract(){
    console.log('calling', 'calling')
    const res=await contract.get_balance()
    console.log(res)
  }

  async function writeToContract(){
    contract.connect(account)
    const mycall=contract.populate('increase_balance',[35])
    const res=await contract.increase_balance(mycall.calldata)
    console.log(res)
  }

  return (
    <div>
    <button onClick={callContract}> Call Contract</button>
    <button onClick={writeToContract}> Write to  Contract</button>
    </div>
    )
}

export default App