// use to interact to Metamask which we will use to manage ethereum
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
// import SimpleStorage from './contracts/SimpleStorage.json';
import _Insurengine from './contracts/_InsurengineC.json';
import _BUSD from './contracts/_BUSD.json';

const getBlockchain = () =>
    new Promise(async (resolve, reject) => {
        let provider = await detectEthereumProvider();
        if (provider) {

            console.log('provider check metamask', provider.selectedAddress);

            await provider.request({ method: 'eth_requestAccounts' });
            const networkId = await provider.request({ method: 'net_version' })
            console.log('networkId', networkId);
            provider = new ethers.providers.Web3Provider(provider);
            const signer = provider.getSigner();
            /*  to check a user address
            ethereum.selectedAddress. */
            if (_Insurengine.networks[networkId]) {
                const _insurengine = new Contract(
                    _Insurengine.networks[networkId].address,
                    _Insurengine.abi,
                    signer // this will help us send transaction thereby making our communication to be secure
                );
                // console.log('{ _insurengine }', { _insurengine }, _Insurengine.networks[networkId].address);
                console.log('provider', provider);
                resolve({ _insurengine, provider, signer, networkId });
                return;
            } else {
                const _insurengine = { data: 'Select Required Metamask network' };
                console.log('{ _insurengine }', { _insurengine });
                // console.log(ethereum.isMetaMask);

                resolve({ _insurengine, provider, signer, networkId });
                return;
            }

        }
        reject('Install Metamask');
    });

export default getBlockchain;
