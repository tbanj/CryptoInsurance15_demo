import { ethers, Contract } from 'ethers';
import bUSD_ABI from '../contracts/_BUSD.json';

let hashuranceABI, hashuranceAddress, hashurancecontract;

async function initiateBUSD() {
    try {
        console.log('0.1 * 2000', 0.1 * 2000);
        var amount = Number(0.1 * 2000); //10% of estimated cost. //Watch out for decimals when sending an amount.
        await payBUS(amount)
        // await payBUSD(amount)
        // var receipt_ = await composeReceipt();
        // await apply(receipt_);
    } catch (error) {
        console.log(error);
    }
}

async function payBUSD(deposite) {
    console.log('bUSD_ABI we are here');
    console.log('bUSD_ABI m', bUSD_ABI.abi[0].payable);

    var bUSDAddress = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';
    var bUSDcontract = await new window.web3.eth1.Contract(bUSD_ABI.abi, bUSDAddress);
    console.log('bUSDcontract', bUSDcontract);
    // const account = await getCurrentAccount();
    var _to = '0xf49cF1a41604fe8b4db9C68551E5be493BEB6956';
    //var estimatedCost = Number(2000);
    // var _receipt = await bUSDcontract.methods.transfer(_to, deposite).send({ from: account });
    // console.log(_receipt);
    // updateStatus('Verifying payment...');
    // return _receipt;
}

function composeReceipt(receipt) {
    //Create receipt template.
    /* e.g
    {
     "blockNumber": 7823037,
     "from_": "0x827a16970788635726f2b4c6f94cd65622599075",
     "to_": "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
     "paymentTime": 1615834176;
     "receiver": "0xf49cF1a41604fe8b4db9C68551E5be493BEB6956",
     "value": "2", //2 BUSD.
     "transactionHash": "0x332ccdc4a6f0d82902816f149c4ae4c5399d7c14438624d3a3e94a0f88ca5c0b"
    }*/

    console.log('composeReceipt, func to build receipt', receipt);
    /*  var receiptSummary =  {};
     receiptSummary.blockNumber = receipt.blockNumber;
     receiptSummary.from_ = account;
     receiptSummary.to_ = receipt.to; //BUSD contract address;
     receiptSummary.receiver = _to;  //receiver's address;
     receiptSummary.paymentTime = 1; //new Date().getTime(); Slight difference with the blockchain's timestammp.
     receiptSummary.value = amount;
     receiptSummary.transactionHash = receipt.transactionHash; 
     return receiptSummary; */
}


async function inspectApplication(decision) {
    try {
        //onclick event of either buttons should return an object, which should contain the applcation form.
        // const account = await getCurrentAccount();
        // var fakeForm = {
        //     "applicant": _account,
        //     "whatToInsure": "Phone screen",
        //     "estimatedCost": 2000,
        //     "applicationTime": 1625834176,
        //     "toApproveCount": 0,
        //     "toDenyCount": 0,
        //     "finalDecision": 0,
        //     "reasonForDenial": "non",
        //     "applicationID": 0,
        //     "prequelID": 0
        // }
        // var inspection = await hashurancecontract.methods.prepForInspection(fakeForm.applicationID, decision, "null").send({ from: account });
        // console.log(inspection);
    } catch (error) {
        console.log('error', error);
    }
}


async function apply(receipt) {
    // updateStatus('Submitting application...');
    //Call Hashurance engine then send details and receipt.
    //hashuranceABI = ;
    //hashuranceAddress = ;
    hashurancecontract = await new window.web3.eth.Contract(hashuranceABI, hashuranceAddress);
    // let response = await hashurancecontract.methods.applyForInsurance("Phone screen", estimatedCost, 0, receipt).send({ from: account });
    // console.log(response);
    // updateStatus('Application submitted!!!');
}



// test 1
async function payBUS(deposite) {
    //Fill application form before this.
    // updateStatus(`Processing payment...`);
    var bUSD_AB = [{ "constant": false, "inputs": [], "name": "disregardProposeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "assetProtectionRole", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "r", "type": "bytes32[]" }, { "name": "s", "type": "bytes32[]" }, { "name": "v", "type": "uint8[]" }, { "name": "to", "type": "address[]" }, { "name": "value", "type": "uint256[]" }, { "name": "fee", "type": "uint256[]" }, { "name": "seq", "type": "uint256[]" }, { "name": "deadline", "type": "uint256[]" }], "name": "betaDelegatedTransferBatch", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "sig", "type": "bytes" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "fee", "type": "uint256" }, { "name": "seq", "type": "uint256" }, { "name": "deadline", "type": "uint256" }], "name": "betaDelegatedTransfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "initializeDomainSeparator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addr", "type": "address" }], "name": "unfreeze", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "claimOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newSupplyController", "type": "address" }], "name": "setSupplyController", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "target", "type": "address" }], "name": "nextSeqOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newAssetProtectionRole", "type": "address" }], "name": "setAssetProtectionRole", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addr", "type": "address" }], "name": "freeze", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newWhitelister", "type": "address" }], "name": "setBetaDelegateWhitelister", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "decreaseSupply", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "isWhitelistedBetaDelegate", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addr", "type": "address" }], "name": "whitelistBetaDelegate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_proposedOwner", "type": "address" }], "name": "proposeOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "increaseSupply", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "betaDelegateWhitelister", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "proposedOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addr", "type": "address" }], "name": "unwhitelistBetaDelegate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_addr", "type": "address" }], "name": "wipeFrozenAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "EIP712_DOMAIN_HASH", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "isFrozen", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "supplyController", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "reclaimBUSD", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "currentOwner", "type": "address" }, { "indexed": true, "name": "proposedOwner", "type": "address" }], "name": "OwnershipTransferProposed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "oldProposedOwner", "type": "address" }], "name": "OwnershipTransferDisregarded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "oldOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "addr", "type": "address" }], "name": "AddressFrozen", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "addr", "type": "address" }], "name": "AddressUnfrozen", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "addr", "type": "address" }], "name": "FrozenAddressWiped", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "oldAssetProtectionRole", "type": "address" }, { "indexed": true, "name": "newAssetProtectionRole", "type": "address" }], "name": "AssetProtectionRoleSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "SupplyIncreased", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "SupplyDecreased", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "oldSupplyController", "type": "address" }, { "indexed": true, "name": "newSupplyController", "type": "address" }], "name": "SupplyControllerSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": false, "name": "seq", "type": "uint256" }, { "indexed": false, "name": "fee", "type": "uint256" }], "name": "BetaDelegatedTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "oldWhitelister", "type": "address" }, { "indexed": true, "name": "newWhitelister", "type": "address" }], "name": "BetaDelegateWhitelisterSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "newDelegate", "type": "address" }], "name": "BetaDelegateWhitelisted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "oldDelegate", "type": "address" }], "name": "BetaDelegateUnwhitelisted", "type": "event" }];
    var bUSDAddress = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';
    var bUSDcontract = await new window.web3.eth1.Contract(bUSD_AB, bUSDAddress);
    console.log('bUSDcontract', bUSDcontract);
    // const account = await getCurrentAccount();
    // var _to = '0xf49cF1a41604fe8b4db9C68551E5be493BEB6956';
    // //var estimatedCost = Number(2000);
    // var _receipt = await bUSDcontract.methods.transfer(_to, deposite).send({ from: account });
    // console.log(_receipt);
    // updateStatus('Verifying payment...');
    // return _receipt;
}



// initiateBUSD();
export default initiateBUSD()
