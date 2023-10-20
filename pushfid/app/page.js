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
//   const bobWalletAddress = "0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666";

//   const aliceMessagesBob = await userAlice.chat.send(bobWalletAddress, {
//     content: "Gm gm! It's a me... Mario"
//   });

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

const CreateGroup=async()=>{
  const userA= await PushAPI.initialize(state.signer, { env: 'staging' });

const groupName = "A dash3  PUSHFI Group";
const groupDescription = "This is an example group.";
const groupImage = "data:image/png;base64,iVBORw0K..."; // example base64 encoded image string
const walletAddress1 = "0x07c4Ec3d994555282d6e3Df491B3CEb0381633f2";
const walletAddress2 = "0xd9713fe7098713A89117C3A51F888b75c6D63fdA";

const newGroup = await userA?.chat?.group?.create(groupName, 
  {
    description: groupDescription,
    image: groupImage,
    members: [walletAddress1, walletAddress2,],
    admins: [],
    private: false,
    rules: {
      entry: { conditions: [] },
      chat: { conditions: [] },
    },
  },)
  console.log(newGroup)
}
const sendMesage=async()=>{
    const userA= await PushAPI.initialize(state.signer, { env: 'staging' });
    // const response = await userA?.channel?.create({
    //   name: 'ETHDEMO',
    //   description: 'This is demo channel which ',
    //   icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC',
    //   url: 'https://push.org',
    // })
  // await userAlice.chat.group.join(chatid)

    const joinGroup = await userA?.chat?.group.join("a0acaa1c3bce0a0114895903bbf229c16f4d64dd0c4749b7022b5de185f936af");
  }
  // await userAlice.chat.group.join(chatid)

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
                <button className='m-1 p-2 bg-slate-500' onClick={()=>sendMesage()}>join</button>
     </div>
     <div>
     <button className='m-1 p-2 bg-slate-600' onClick={()=>CreateGroup()}>Creategroup</button>
     </div>
    </main>
  )
}
export default Home