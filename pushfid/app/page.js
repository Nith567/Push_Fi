'use client'
  import { PushAPI } from '@pushprotocol/restapi';
import { send } from '@pushprotocol/restapi/src/lib/chat';
  import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
  import { ethers } from 'ethers';
  import { useEffect, useState } from 'react';
  // Creating a random signer from a wallet, ideally this is the wallet you will connect
  // const signer = ethers.Wallet.createRandom();


// const signerS = ethers.Wallet.createRandom()
// const userAlice = await PushAPI.initialize(signerS, { env: 'staging' })
// const response = await userAlice.channel.create({
//   name: 'DEMO Test Channel',
//   description: 'this is a demo testchannel',
//   icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC',
//   url: 'https://push.org',
// })
//   // This will be the wallet address of the recipient 
//   const bobWalletAddress = "0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666";

//   // Send a message to Bob
//   const aliceMessagesBob = await userAlice.chat.send(bobWalletAddress, {
//     content: "Gm gm! It's a me... Mario"
//   });

//   // Create Socket to Listen to incoming messages
//   const pushSDKSocket = createSocketConnection({
//     user: signer.wallet,
//     socketType: 'chat',
//     socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
//     env: 'staging',
//   });

//   // React to message payload getting received
//   pushSDKSocket?.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
//     console.log("hit"+ message);
//   });
 function Home() {


const [state, setState] = useState({
  provider:null,
  signer:null

});
const [account, setAccount] = useState('None');
const connectWallet = async () => {
  try {
      const { ethereum } = window;

      if (ethereum) {
          const accounts = await ethereum.request({
              method: 'eth_requestAccounts',
          });

          window.ethereum.on('chainChanged', () => {
              window.location.reload();
          });

          window.ethereum.on('accountsChanged', () => {
              window.location.reload();
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();

          setAccount(accounts[0]);
          setState({ provider, signer });
          console.log("there is" + state.signer)
      } else {
          alert('Please install MetaMask');
      }
  } catch (error) {
      console.log(error);
  }
};

const sendMesage=async()=>{
    const userA= await PushAPI.initialize(state.signer, { env: 'staging' });
    const response = await userA?.channel?.create({
      name: 'asdasdel',
      description: 'Tasdasdasdasdaest Description',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC',
      url: 'https://push.org',
    })
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div>
      {account !== 'None' ? (
                <p>Connected Account: {account}</p>
            ) : (
                <button onClick={()=>connectWallet()}>Metamask</button>
            )}
                </div>
                Create a Channel
                <button className='m-1 p-2 bg-slate-500' onClick={()=>sendMesage()}>Create</button>
     </div>
    </main>
  )
}
export default Home