# Polling-DApp
Decentralised Polling app

This is a decentralized app meaning instead of being hosted on a hosting service, it is on a blockchain.

# How to compile 
We specify the version because of the solidity version we are using
```
npm install solc@0.6.4
node_modules/.bin/solcjs --bin --abi voting.sol
```

This will create two files (which are already in this repo) called `voting_sol_Voting.bin` and `voting_sol_Voting.abi`
# How to run
### This is only for MacOS
Install ganache-cli using `npm install ganache-cli`
You'll see 10 accounts with 100 fake Ether.

Open another terminal window and open the node terminal
and run the following commands. Make sure the version of `web3.js` is > 1

```
>Web3 = require('web3')
>web3 = new Web3("http://localhost:8545")
>bytecode = fs.readFileSync('voting_sol_Voting.bin').toString()
>abi = JSON.parse(fs.readFileSync('voting_sol_Voting.abi').toString())
```

Now we deploy the contract
```
>deployedContract = new web3.eth.Contract(abi)

>listOfCandidates = ['Brian Quinn', 'Anthony Padilla', 'Shahzeb Khan’, ‘Dee Reynolds’]

>deployedContract.deploy({
  data: bytecode,
  arguments: [listOfCandidates.map(name => web3.utils.asciiToHex(name))]
}).send({
  from: 'ENTER 1 OF 10 ACCOUNT ADDRESSES like 0xfb3....',
  gas: 2000000,
  gasPrice: web3.utils.toWei('0.00003', 'ether')
}).then((newContractInstance) => {
  deployedContract.options.address = newContractInstance.options.address
  console.log(newContractInstance.options.address)
});
```
Now check the terminal with the ganache-cli open you should see something like 
```
Transaction: 0x2f50e853a92b6079f68f53f90677ad7018fb78158eba2facfbac4502f8227a9c
Contract created: 0x7e8c83dabdf0fcece7b1fe82d7054a15cf052a65
Gas usage: 340950
Block Number: 1
Block Time: Tue Jun 08 2021 01:22:25 GMT+0530 (India Standard Time)
```

Add the `Contract created` address in the `index.js` where it is mentioned.
And done! Run your index.html file and you'll see that the votes are displayed 





















