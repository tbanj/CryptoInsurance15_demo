import * as actionTypes from '../actions/index';
const initialState = {
    status: false, posts: [], submitBTN: false, schemaDetail: {}, userData: [], insureData: {},

    metaMaskState: {
        isConnected: false, selectedAddress: undefined, chainId: undefined,
        hashuranceContractAddress: undefined, _insurengine: undefined
    }
}
// const [userToken, setUserToken] = useState({});

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_USER:
            const newState = Object.assign({}, state);
            newState.user = action.payload
            console.log('newState', newState);
            return newState;

        case actionTypes.SUBMIT_BTN_STATE:
            const btnState = Object.assign({}, state);
            btnState.submitBTN = action.payload;
            return btnState;
        case actionTypes.FORM_SCHEMA_DATA:
            const schemaData = Object.assign({}, state);
            schemaData.schemaDetail = action.payload;
            return schemaData;

        case actionTypes.METAMASK_DATA:
            const metaState = Object.assign({}, state);
            metaState.metaMaskState = action.payload;
            return metaState;

        case actionTypes.USER_INSURE_REC:
            const userInsureRec = Object.assign({}, state);
            console.log('action.payload', action.payload);
            userInsureRec.userData = [action.payload, ...userInsureRec.userData];
            console.log('userInsureRec.userData', userInsureRec.userData);
            return userInsureRec;

        case actionTypes.INSURE_INFO:
            const storeInsureData = Object.assign({}, state);
            storeInsureData.insureData = action.payload;
            return storeInsureData;

        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: state.posts.concat(action.payload)
            }
        default:
            return state;
    }
}

export default reducer;