import React, { Fragment, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import getBlockchain from './ethereum';
// import env from './env';
import * as actions from './store/actions/index';
import { storeSigner } from './service/helper';
import InsuranceApply from './components/insuranceApply/InsuranceApply';
import Home from './components/Home/Home';
import InsureListAndPolicy from './components/insureListAndPolicy/InsureListAndPolicy';
import FullPageSpinner from './components/loader/FullPageSpinner';
import NoMatch from './components/notfound/NotFound';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import "react-toastify/dist/ReactToastify.css";
import './App.css';




const InsureRoute = lazy(() => import('./components/insure/Insure'));
// export interface Props {
//     updateMetamask: ImetamaskData,
//     metaMaskState: ImetamaskData

// }

export interface Props {
    // updateMetamask: ImetamaskData,
    updateMetamask: any,
    metaMaskState: any,
    actions: {
        updateMetamask: Dispatch<any>
    }

}

export interface ImetaProps {
    // updateMetamask: ImetamaskData,
    metaMaskState: ImetamaskData

}

// ITodoProps



// type ImetamaskData { isConnected: boolean, selectedAddress: string | undefined, chainId: string | undefined }

export interface ImetamaskData {
    isConnected: boolean, selectedAddress: string | undefined, chainId: string | undefined,
    hashuranceContractAddress: string | undefined,
    _insurengine: undefined, networkId: number
}


export interface ImetaMaskState { metaMaskState: ImetamaskData }
export interface State {
    bscState: boolean,
    _insurengine: any,
    data: string | undefined,
    selectedAddress: undefined,
}


class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            bscState: false,
            _insurengine: undefined,
            data: undefined,
            selectedAddress: undefined,
        }
    }

    componentDidMount() {
        // initialize blockchain through metamask
        this.init();
    }

    init = async () => {
        const { _insurengine, provider, signer, networkId }: { _insurengine: any, provider: any, signer: any, networkId: number } = await getBlockchain();
        if ('checkNetwork()' in _insurengine === false) {
            this.setState({
                _insurengine, data: 'Select Binance Smart Chain Test Network Required'
            })
            // setData('Select Binance Smart Chain Test Network Required');

            // this.props.updateMetamask({isConnected: provider.isConnected(), selectedAddress:  provider.selectedAddress,
            //       chainId: provider.chainId});
            return;
        }

        // const dataTest = await Promise.all([_insurengine.checkNetwork(), _insurengine.totalSupply(), _insurengine.getHashTokenName()]);
        console.log('provider check metamask now', _insurengine);
        console.log('networkId', networkId);

        const dataTest = await Promise.all([_insurengine.checkNetwork()]);
        console.log('dataTest', dataTest[0]);
        const metamaskUpdate: ImetamaskData = {
            isConnected: provider.provider.isConnected(), selectedAddress: provider.provider.selectedAddress,
            chainId: provider.provider.chainId, hashuranceContractAddress: _insurengine.address, _insurengine,
            networkId
        };
        await this.props.updateMetamask(metamaskUpdate) as ImetamaskData;
        console.log('signer', signer);

        storeSigner(signer);
        this.setState({ _insurengine, bscState: dataTest[0], selectedAddress: provider.provider.selectedAddress });
    };





    render() {
        const { bscState, data, selectedAddress }: { bscState: boolean, data: string | undefined, selectedAddress: undefined } = this.state;
        let networkTest;
        if (selectedAddress === null || bscState === false) {
            networkTest = <div className="row">
                <div className="text-center mt-5">
                    <h1>{data}</h1>
                </div>
            </div>
        }
        return (
            <Fragment>
                <ToastContainer />
                {networkTest}
                {bscState === true && <Router>
                    <ErrorBoundary>
                        <Suspense fallback={FullPageSpinner}>
                            <Switch>
                                <Route path="/insure-list/:id" render={props => (
                                    <Suspense
                                        fallback={
                                            <div> <span><i className="fa fa-spinner"></i></span> </div>}>
                                        <InsureRoute {...props} />
                                    </Suspense>)} />
                                <Route path="/insure-list" component={InsureListAndPolicy} />
                                <Route path="/insurance-apply" component={InsuranceApply} />
                                <Route exact path="/" component={Home} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Suspense>
                    </ErrorBoundary>
                </Router>}
            </Fragment>
        );
    }
}


function mapStateToProps(state: any): any {
    return { metaMaskState: state.metaMaskState }
}

// function mapDispatchToProps(dispatch: Dispatch<any>): any {
//     return bindActionCreators({ someAction: actions.updateMetamaskData }, dispatch)
// }

export default connect<ImetaMaskState, any, {}>(mapStateToProps, { updateMetamask: actions.updateMetamaskData })(App);
// export default connect<ImetaMaskState, ImetaMaskActionProps {}>(mapStateToProps, { updateMetamask: actions.updateMetamaskData })(App)
