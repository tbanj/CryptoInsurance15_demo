import { Contract } from 'ethers';
import HASH_ABI from '../contracts/_InsurengineC.json';
import env from '../env';
import { getSelectedAccount, getSigner, getStoreDetails } from './helper';


const { metaMaskState } = getStoreDetails();

const bUSDcontract = new Contract(
    metaMaskState.hashuranceContractAddress,
    HASH_ABI.abi,
    getSigner() // this will help us send transaction thereby making our communication to be secure
);
async function getPolicies() {
    // bUSDcontract.get
}

function getPolicy(params) {

}

