import { ethers, Contract } from 'ethers';
import Struct_ABI from '../contracts/_structTest.json';
import hashurance_ABI from '../contracts/_InsurengineC.json';
import HashuranceToken_ABI from '../contracts/HashuranceTokenC.json';
import env from '../env';
import { getSelectedAccount, getSigner, getStoreDetails } from './helper';
let hashuranceContract;
let hashuranceTokenContract;
let structTokenContract;
const _to = env.hashurance_address;


// implement the StructTest contract has a third party
/* function initiateStructContract() {
    // const bUSDAddress = env.busd_address;
    const structAddress = "0x616c827c33D8a68737c9C2Bf8A6f12eFE233481a";
    structTokenContract = new Contract(
        structAddress,
        Struct_ABI.abi,
        getSigner() // this will help us send transaction thereby making our communication to be secure
    );
    console.log('structcontract kkk mm', structTokenContract);
    return structTokenContract;
} */

// implement the StructTest contract has a primary contract
function initiateStructContract() {
    // const bUSDAddress = env.busd_address;
    const { networkId } = getStoreDetails();
    console.log('networkId', networkId);
    structTokenContract = new Contract(
        Struct_ABI.networks[networkId].address,
        Struct_ABI.abi,
        getSigner() // this will help us send transaction thereby making our communication to be secure
    );
    console.log('structcontract kkk mm', structTokenContract);
    return structTokenContract;
}


async function testStructApply() {
    try {
        // const update = await hashuranceTokenContract.updateDepoPool([2,
        //     "0x424e4a2AD3A92cE9B4B617155dB224EF34a53410",
        //     "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
        //     "0xDf4D56b47C5d1223f5FAbB49089e8AF7De418C24",
        //     67545788, 10,
        //     "0x77cdc6215ec865c8967ab8365ccc2a9fd2ad8288c63aee96f13450ad304cf580", "dggdhdjjdjd"]);
        // console.log('update.hash', update.hash);
        // await update.wait();

        const val = { "score": 400, class: "ss2", "addr": "0x424e4a2AD3A92cE9B4B617155dB224EF34a53410" };
        const text = "Hello";

        const update = await structTokenContract.addStudentStructSingText(text, val);
        // await update.wait();
        console.log('update', update);
    } catch (error) {
        console.log('error', error);
    }
}



export {
    initiateStructContract, testStructApply
}
