import { ethers, Contract } from 'ethers';
import bUSD_ABI from '../contracts/_BUSD.json';
import env from '../env';
import { getSelectedAccount, getSigner, getStoreDetails } from './helper';
let hashuranceABI, hashuranceAddress, hashurancecontract;
const _to = env.hashurance_address;

const bUSDAddress = env.busd_address;
const bUSDcontract = new Contract(
    bUSDAddress,
    bUSD_ABI.abi,
    getSigner() // this will help us send transaction thereby making our communication to be secure
);

async function initialDeposit(amt) {
    try {
        //  get details from redux store
        const { metaMaskState } = getStoreDetails();
        const pwr = 10 ** 18;
        const account = metaMaskState.selectedAddress;
        const amountPaid = await payBUSD((pwr * amt).toString(), account);
        //10% of estimated cost. //Watch out for decimals when sending an amount.
        console.log('amountPaid', amountPaid);

        let receipt_ = await composeReceipt(amountPaid, account, _to, amt);
        await apply(receipt_);
    } catch (error) {
        console.log(error);
    }
}

/* let bUSDAddress = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee'
        const busd = new Contract(
          bUSDAddress,
          _BUSD.abi,
          signer // this will help us send transaction thereby making our communication to be secure
        ); */


async function payBUSD(deposite, account) {
    console.log('ehehhe', env);

    console.log('bUSDcontract', bUSDcontract);

    //var estimatedCost = Number(2000);
    // const totalSup = await bUSDcontract.totalSupply()

    // await getTotalSupply(bUSDcontract);
    // await getTokenBalan(bUSDcontract, '0x2Ce1d0ffD7E869D9DF33e28552b12DdDed326706');
    await creditContractWithBUSD(bUSDcontract, account, _to, deposite);
    console.log('deposite', deposite, 'account', account);

    // updateStatus('Verifying payment...');
    // return _receipt;
}

async function getTotalSupply() {
    const totalSup = await bUSDcontract.totalSupply();
    console.log(Number(totalSup));
}

async function getTokenBalan(account) {
    try {
        console.log('account', account);
        const bUSDAddressd = env.busd_address;
        const bUSDcontractd = new Contract(
            bUSDAddressd,
            bUSD_ABI.abi,
            getSigner() // this will help us send transaction thereby making our communication to be secure
        );
        const balance = await bUSDcontractd.balanceOf(account);
        console.log(Number(balance));
        return balance;
    } catch (error) {
        console.log('error', error);
    }
}

async function creditContractWithBUSD(bUSDcontract, account, _to, deposite) {
    try {
        let _receipt = await bUSDcontract.transfer(_to, deposite).send({ from: '0x424e4a2ad3a92ce9b4b617155db224ef34a53410' });
        // let _receipt = await bUSDcontract.methods.transfer(_to, deposite).send({ from: account });
        console.log('_receipt', _receipt);
    } catch (error) {

    }
}

function composeReceipt(receipt, _account, _to, _amount) {
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
    receiptSummary.to_ = receipt.to; //BUSD contract address;
    receiptSummary.receiver = _to;  //receiver's address;
    receiptSummary.paymentTime = 1; //new Date().getTime(); Slight difference with the blockchain's timestammp.
    receiptSummary.value = _amount;
    receiptSummary.transactionHash = receipt.transactionHash;

    console.log('receiptSummary', receiptSummary);
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

    // var bUSDAddress = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';
    // var bUSDcontract = await new window.web3.eth1.Contract(bUSD_AB, bUSDAddress);
    // console.log('bUSDcontract', bUSDcontract);
    // const account = await getCurrentAccount();
    // var _to = '0xf49cF1a41604fe8b4db9C68551E5be493BEB6956';
    // //var estimatedCost = Number(2000);
    // var _receipt = await bUSDcontract.methods.transfer(_to, deposite).send({ from: account });
    // console.log(_receipt);
    // updateStatus('Verifying payment...');
    // return _receipt;
}



// initiateBUSD();
export { initialDeposit, getTokenBalan }
