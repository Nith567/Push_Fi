'use client'
  import { PushAPI } from '@pushprotocol/restapi';
import { send } from '@pushprotocol/restapi/src/lib/chat';
  import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
  import { ethers } from 'ethers';
  import { useEffect, useState } from 'react';

  import { CovalentClient } from "@covalenthq/client-sdk";
  import { LitNodeClientNodeJs } from "@lit-protocol/lit-node-client-nodejs";
  import { ProviderType } from "@lit-protocol/constants";

 function Home() {
const [state, setState] = useState({
  provider:null,
  signer:null

});
const [aliceChats, setAliceChats] = useState([]);
const [datas,SetDatas]=useState(null)
const [inputText, setInputText] = useState('')
const [data,setData]=useState({})
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
const handleInputChange = (e) => {
  setInputText(e.target.value); // Update the inputText state with the input value
};


const computePublicKey = async (userId, appId) =>{
  const litNodeClient = new LitNodeClientNodeJs({
    litNetwork: "cayenne",
    debug: false,
  });
  await litNodeClient.connect();

  try {
    const keyId = litNodeClient.computeHDKeyId(userId, appId);
    console.log(keyId);
    const managedKeyId = keyId.substring(2);
    const publicKey = litNodeClient.computeHDPubKey(managedKeyId);
    console.log(publicKey);
    // const address = publicKeyToAddress(publicKey);
    // console.log(address);
    console.log("user public key will be: ", publicKey);
    return publicKey;
  } catch (error) {
    console.log(error);
    return;
  }
};


const getDiscordPubKey = async () => {
  try {
    const user_id = "882160225862430730";
    console.log(user_id);
    const publicKey = await computePublicKey(session?.user.email, process.env.DISCORD_CLIENT_ID);
    console.log("public Key: "+publicKey);
    setPublicKey(publicKey);
  } catch (error) {
    console.log(error);
  }
};



let addressExists = false;
  const ApiServices = async () => {
    const client = new CovalentClient("cqt_rQRBMP9wyWbGXhT4qCXBWMJRMyCB");
    // const resp = await client.BalanceService.getTokenBalancesForWalletAddress("eth-sepolia", "0x161D70B69fdbD2D4656Dd1ba62845DEa5008c634"); // Example call
    // const resp = await client.TransactionService.getTransactionSummary("eth-sepolia","0x161D70B69fdbD2D4656Dd1ba62845DEa5008c634");
    // const resp2 = await client.BaseService.getAddressActivity("0xA2a9055A014857d6c1e8f1BDD8682B6459C5Fa85");
    try {
      for await (const resp of client.TransactionService.getAllTransactionsForAddress("eth-mainnet","0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5")
      ) 
       {
      if(resp.to_address==='0xe688b84b23f322a994a53dbf8e15fa82cdb71127'){
        addressExists=true;
        break;
      }
       }
       if (addressExists) {
        console.log(`Address ${targetAddress} exists in the API response.`);
      } else {
        console.log(`Address ${targetAddress} does not exist in the API response.`);
      }
  } catch (error) {
      console.log(error.message);
  }
}


const chatList = async () => {
  const userA = await PushAPI.initialize(state.signer, { env: 'staging' });
  const chats = await userA?.chat?.list("CHATS");
  setAliceChats(chats || []);
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
const Twitterpos = async () => {
  try {
      const apiUrl = `https://proof-service.next.id/v1/proof?platform=twitter&identity=${inputText}&exact=true`;
      const response = await axios.get(apiUrl);
      const responseData = response.data;
      SetDatas(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

const createChannel=async()=>{
  const userA= await PushAPI.initialize(state.signer, { env: 'staging' });
  const response = await userA?.channel.create({
  name: 'DEMO Test Channel',
  description: 'demo eth channel ',
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC',
  url: 'https://push.org',
})
}
const sendMesage=async()=>{
    const userA= await PushAPI.initialize(state.signer, { env: 'staging' });

  const createTokenGatedGroup = await userA.chat.group.create('FI on PUSHFI', {
    description: 'Token gated web3 native chat example', // provide short description of group
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAuUlEQVR4AcXBIY5CMRiF0e/ddA1YXLeAHINGNyMwDasitZNqNGa2MLKOXeDe2F+VvBByz1nOu+dK8HP/4pO+j79EwkyYCbMl/R1WJnrNvKO0wYwwE2bCLLFRaYOZXjNbCDNhJsyEmTATZsIs9ZqJSht8Uq+ZSJgJM2GWeKG0QdRrZqa0wRbCTJgJs1TaIOo1E5U2eEevmai0QSTMhJkwW86758rEaX8huj2uzJz2F6Lb48qMMBNmwuwfJS4m9/9SUGcAAAAASUVORK5CYII=', // provide base64 encoded image
    members: [],
    admins: [], // not needed as per problem statement, can omit
    private: true,
    "rules": {
      "entry": { 
        "conditions": { 
          "any": [ 
            { 
              "any": [ 
                { // criteria 1
                  "type": "PUSH",
                  "category": "INVITE",
                  "subcategory": "DEFAULT",
                  "data": {
                      "inviterRoles": [
                          "ADMIN",
                          "OWNER"
                      ]
                  }
                }
              ]
            },
            {
              "any": [ // decider 2 - If user has $PUSH on Ethereum or on Polygon
                { // criteria object
                  "type": "PUSH", // define type that rules engine should go for
                  "category": "ERC20", // define it's ERC20 token that you want to check, supports ERC721 as well
                  "subcategory": "holder", // define if you are checking 'holder' or 'owner'
                  "data": { 
                    "contract": "eip155:137:0x2b9bE9259a4F5Ba6344c1b1c07911539642a2D33", // $PUSH address on ETH
                    "comparison": ">=", // what comparison needs to pass
                    "amount": 12, // amount that needs to passed
                    "decimals": 18, // the decimals for the token
                  }
                },
              ]
            }
          ]
        }
      }
    },
    "chat": {
      "conditions": { // define condition for sending message in the group
        "all": [
          {
            "any": [ // set decider to 'any', if 'and' then all rules need to be fulfilled
              { // define criteria 1
                "type": "PUSH", // define type that rules engine should go for, currently supports PUSH or GUILD
                "category": "ERC20", // define it's ERC20 token that you want to check, supports ERC721 as well
                "subcategory": "holder", // define if you are checking 'holder' or 'owner'
                "data": { // define the data check
                  "contract": "eip155:1:0xBE18197d1c071b72fb2460B1652C96C22d40F1D9", // pass {blockchain_standard}:{chain_id}:{address} as a shorthand
                  "comparison": "<=", // what comparison needs to pass
                  "amount": 1000, // amount that needs to passed
                  "decimals": 18, // the decimals for the contract
                }
              }
            ]
          }
        ]
      }
    }
  });
  console.log("so token"+createTokenGatedGroup.chatId + " "+ createTokenGatedGroup);
  }

const createwithchannelId=async()=>{
  const userA= await PushAPI.initialize(state.signer, { env: 'staging' });
  const joinGroup = await userA.chat.group.join('79d3b055d0ea15bbaba1577fe4812ba8f9e66e71b9cfeef5bab9ee9e123b74db');
  console.log("sgroup" +joinGroup);
}
const apiUrl = `https://proof-service.next.id/v1/proof?platform=twitter&identity=${inputText}&exact=true`;
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
              
                <button className='m-1 p-2 bg-slate-500' onClick={()=>sendMesage()}>CreateDAO</button>
     </div>
     <ul>
        {aliceChats.map((chat, did) => (
          <li key={did}>
            <div>Chat ID: {chat.chatId}</div>
            <div>Abouts: {chat.did}</div>
          </li>
        ))}
      </ul>
     <div>
     <button className='m-1 p-2 bg-slate-600' onClick={()=>CreateGroup()}>Creategroup</button>
     </div>
     <div>
     <button className='m-1 p-2 bg-purple-600' onClick={()=>createChannel()}>createChannel</button>
     <button className='m-1 p-2 bg-purple-600' onClick={()=>ApiServices()}>transact</button>
     <button className='m-1 p-2 bg-purple-600' onClick={()=>createwithchannelId()}>Fetch details</button>
     <button className='m-1 p-2 bg-purple-600' onClick={()=>chatList()}>chat List</button>
     </div>
     <h1>Data Display</h1>
      {data && (
        <div>
          <p>Avatar: {data?.ids[0]?.avatar}</p>
          <p>Platform: {data?.ids[0]?.proofs[0]?.platform}</p>
          <p>Identity: {data?.ids[0]?.proofs[0]?.identity}</p>
        </div>
      )}
   <p>You Twitterhandle: {inputText}</p>
<h1>Input and Display</h1>
    
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <button className='m-1 p-2 bg-slate-600' onClick={()=>Twitterpos()}>Connected with twitter profile or not</button>
   
    </main>
  )
}
export default Home