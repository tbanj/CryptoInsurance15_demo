import { store } from '../createStore';


let signer;
let selectedAccount;

function getStoreDetails() {
    // return store.getState().items.all or store.getState()
    // store.dispatch(endGame())
    console.log('getStoreDetails()',);
    return store.getState();
}


function getSigner() {
    return signer;
}

function storeSigner(data) { signer = data; }



function getSelectedAccount() {
    console.log(`store.getState()['selectedAddress']`, store.getState());
    const storeState = store.getState();
    console.log('storeState',);
    return storeState.metaMaskState.selectedAddress;
}

function storeSelectedAccount(data) {
    selectedAccount = data;
    console.log('signer', selectedAccount);
}

export { getSigner, storeSigner, getSelectedAccount, storeSelectedAccount, getStoreDetails }