import { ethers, Contract } from 'ethers';
import bUSD_ABI from '../contracts/_BUSD.json';
import hashurance_ABI from '../contracts/_InsurengineC.json';
import HashuranceToken_ABI from '../contracts/HashuranceTokenC.json';
import env from '../env';
import { getSelectedAccount, getSigner, getStoreDetails } from './helper';
let hashuranceContract;
let hashuranceTokenContract;
const _to = env.hashurance_address;

let bUSDcontract;
function initiateBUSDContract() {
    // const bUSDAddress = env.busd_address;
    const bUSDAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
    bUSDcontract = new Contract(
        bUSDAddress,
        bUSD_ABI.abi,
        getSigner() // this will help us send transaction thereby making our communication to be secure
    );
    console.log('bUSDcontract kkk mm', bUSDcontract);
    return bUSDcontract;
}

function initializeHashurance() {
    const { metaMaskState } = getStoreDetails();
    hashuranceContract = metaMaskState._insurengine;
    console.log('hashuranceContract', hashuranceContract);
    return hashuranceContract;
}

function initializeHashuranceToken() {
    hashuranceTokenContract = new Contract(
        "0xec03337cd0A84d082Ca64D2bBfeA640cA5737571",
        HashuranceToken_ABI.abi,
        getSigner() // this will help us send transaction thereby making our communication to be secure
    );
    console.log('hashuranceTokenContract', hashuranceTokenContract);
    return hashuranceTokenContract;
}

async function testHSHTApply() {
    try {
        // const update = await hashuranceTokenContract.updateDepoPool([2,
        //     "0x424e4a2AD3A92cE9B4B617155dB224EF34a53410",
        //     "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
        //     "0xDf4D56b47C5d1223f5FAbB49089e8AF7De418C24",
        //     67545788, 10,
        //     "0x77cdc6215ec865c8967ab8365ccc2a9fd2ad8288c63aee96f13450ad304cf580", "dggdhdjjdjd"]);
        // console.log('update.hash', update.hash);
        // await update.wait();

        const test = "Wale";
        const update = await hashuranceTokenContract.updateData(test);
        await update.wait();
        console.log('update', update);
    } catch (error) {
        console.log('error', error);
    }
}

async function initialDeposit(amt) {

    const { metaMaskState } = getStoreDetails();
    const pwr = 10 ** 18;
    const account = metaMaskState.selectedAddress;
    //10% of estimated cost. //Watch out for decimals when sending an amount.
    let receipt_ = await composeReceipt(await payBUSD((pwr * amt).toString(), account, bUSDcontract), account, _to, amt);
    if (receipt_ === undefined) throw new Error('Unable to generate receipt');
    // await apply(receipt_);
    return receipt_;
}

async function payBUSD(deposite, account, bUSDcontract) {
    try {
        const data = await bUSDcontract.transfer(_to, deposite);
        await data.wait();
        console.log('data.hash', data);
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

async function getTotalSupply() {
    const totalSup = await bUSDcontract.totalSupply();
    console.log(Number(totalSup));
}

async function getTokenBalan(account) {
    try {
        let balance = await bUSDcontract.balanceOf(account);
        balance = (10 ** -18) * Number(balance);
        console.log('balance', balance);
        return balance;
    } catch (error) {
        console.log('error', error);
    }
}



function composeReceipt(receipt, _account, _to, _amount) {
    console.log('receipt', receipt, '_account', _account, '_to', _to, '_amount', _amount);
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
    let receiptSummary = {};
    receiptSummary.blockNumber = receipt.blockNumber;
    receiptSummary.from_ = _account;
    receiptSummary.to_contract_addr = receipt.to; //BUSD contract address;
    receiptSummary.receiver = _to;  //receiver's address;
    receiptSummary.paymentTime = 1; //new Date().getTime(); Slight difference with the blockchain's timestammp.
    receiptSummary.value = _amount;
    receiptSummary.transactionHash = receipt.hash;
    return receiptSummary;
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


async function apply(data, receipt) {
    console.log('data', data, 'receipt', receipt);
    // updateStatus('Submitting application...');
    //Call Hashurance engine then send details and receipt.
    //hashuranceABI = ;
    //hashuranceAddress = ;
    // hashuranceContract = await new window.web3.eth.Contract(hashuranceABI, hashuranceAddress);
    const extractData = { ...data, prequelID: 0 };
    console.log('extractData', extractData);
    console.log('hashuranceContract', hashuranceContract);
    const derm = {
        "blockNumber": 7823037,
        "from_": "0x827a16970788635726f2b4c6f94cd65622599075",
        "to_contract_addr": "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
        "receiver": "0xf49cF1a41604fe8b4db9C68551E5be493BEB6956",
        "paymentTime": 1,
        "value": 7865,
        "transactionHash": "0x77cdc6215ec865c8967ab8365ccc2a9fd2ad8288c63aee96f13450ad304cf580",
        "applicationID": "89e63998-8beb-4db4-9c01-84e176bb8e64"
    }
    // let response = await hashuranceContract.testInptData(receipt); // this work
    // let response = await hashuranceContract.testInpt(extractData, receipt)
    // let response = await hashuranceContract.testInptData([[80, "0x827a16970788635726f2b4c6f94cd65622599075", "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee", "0xf49cF1a41604fe8b4db9C68551E5be493BEB6956", 1, 7856, "0x77cdc6215ec865c8967ab8365ccc2a9fd2ad8288c63aee96f13450ad304cf580", "89e63998-8beb-4db4-9c01-84e176bb8e64"
    // ], extractData]);

    // let response = await hashuranceContract.applyForInsurance(extractData, [80, "0x827a16970788635726f2b4c6f94cd65622599075", "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee", "0xf49cF1a41604fe8b4db9C68551E5be493BEB6956", 1, 7856, "0x77cdc6215ec865c8967ab8365ccc2a9fd2ad8288c63aee96f13450ad304cf580", "89e63998-8beb-4db4-9c01-84e176bb8e64"
    // ])
    let response = await hashuranceContract.getChidNumOfValidators();

    // let response = await hashuranceContract.applyForInsurance(extractData, receipt);
    // let response = await hashuranceContract.applyForInsurance(["Laptop keybaord", "0.004", "89e63998-8beb-4db4-9c01-84e176bb8e64", "0", "0xf46dc2B14e4A493135293eBD24Ae07d90cd76B73", "0.0004", "12"],
    //     receipt);

    // let response = await hashuranceContract.applyForInsurance(extractData.insureName, extractData.estimatedCost, "0", receipt);
    console.log('response', response);
    // await response.wait();
    console.log('response', response);

    // const response = await hashuranceContract.checkNetwork();
    // console.log('response', response);
    // let response = await hashurancecontract.methods.applyForInsurance("Phone screen", estimatedCost, 0, receipt).send({ from: account });
    // console.log(response);
    // updateStatus('Application submitted!!!');
}


export {
    initialDeposit, getTokenBalan, initiateBUSDContract, apply,
    initializeHashurance, initializeHashuranceToken, testHSHTApply
}
