import React, { Fragment, useEffect, useState } from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import inputL from '../../assets/images/f_l_name.svg';
import {
    updateSchemaData, updateSubmitBTNState,
    storeInsurerPack,
} from '../../store/actions/index';
import { HookForm } from '../form/Hookform';
import Storage from '../../service/Storage';
import { initialDeposit, getTokenBalan } from '../../service/BUSDService';
import generalCss from '../general.module.css';
import Navbar from '../header/Navbar';


const schemaNew = {
    // insureName: Joi.string().optional().allow("").label("Insure Name"),
    insureName: Joi.string().required().min(3).label("Insure Name"),
    estimatedCost: Joi.string().required().min(3).label("Estimated Cost"),
    estimatedTenure: Joi.string().required().min(1).label("Estimated Tenure"),
    insurerAddress: Joi.string().required().min(3).default('0xf46dc2B14e4A493135293eBD24Ae07d90cd76B73').label("Insurer Engine Address"),
    initialDeposit: Joi.string().required().default(0).min(1).label("'Initial deposit(BUSD) 10%"),


}

// const localData = new Storage();

const InsuranceApply = (props) => {

    const { centerDiv, divRelative, has_search,
        employInfoLeftIn, dIcon_feedback, dIcon, formSubmitButton, validationErrMsg } = generalCss;
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        insureName: undefined, estimatedCost: undefined,
        estimatedTenure: undefined, insurerAddress: '0xf46dc2B14e4A493135293eBD24Ae07d90cd76B73', initialDeposit: '0',
    });
    const { disableSubmitBtn, userDatar } = useSelector(state => ({
        disableSubmitBtn: state.submitBTN,
        userDatar: state.userData
    }));

    // initialiaze the schema data
    useEffect(() => {
        dispatch(updateSchemaData(schemaNew)); return () => { };

    }, []);

    // check if it has minimum amount required is available in the customer account
    async function checkMinDeposit() {
        try {
            const tokenBal = await getTokenBalan();
            console.log('Number(tokenBal)', Number(tokenBal));
            if (tokenBal < inputs.initialDeposit) {
                throw new Error('Kindly fund your account');
            }
            return;
        } catch (error) {
            console.log('error', error);
        }
    }

    async function submitData() {
        try {

            if (inputs.estimatedCost && inputs.estimatedTenure) {

                // SUBMIT_BTN_STATE
                // dispatch(updateSubmitBTNState(true));

                // const estVal= ((parseFloat(inputs.estimatedCost)) * 0.1).toFixed(4) ;
                checkMinDeposit();

                // initialDeposit(inputs.initialDeposit);
                // await dispatch(storeInsurerPack({ ...inputs }));
                // props.history.push('/insure-list');
            } else {
                toast.error("invalid data inputted in 1 of the records")
                dispatch(updateSubmitBTNState(false));
            }
        } catch (error) {
            console.log("server error encounter");
            dispatch(updateSubmitBTNState(false));

        }
    }

    const { renderHInput, renderHInputP, renderHInputDisabled, handleSubmit, renderHInputRequired, inputs, errors, renderButtonH, renderDropdownH, onEmployeeInformation, setInputs } = HookForm(submitData);

    useEffect(() => {



        async function getData() {
            try {
                await setInputs({ ...userData });
            } catch (error) {
                console.log('error', error);
            }
        }


        if (inputs.estimatedCost !== undefined && (parseFloat(inputs.estimatedCost)).constructor.name === "Number") {
            if ((parseFloat(inputs.estimatedCost)).constructor.name === "Number") {
                setInputs({ ...inputs, initialDeposit: ((parseFloat(inputs.estimatedCost)) * 0.1).toFixed(4) });
            }
        }

        // checkMinDeposit();
        getData();


        return () => {

        }
    }, []);


    useEffect(() => {


        if (inputs.estimatedCost !== undefined && (parseFloat(inputs.estimatedCost)).constructor.name === "Number") {
            if ((parseFloat(inputs.estimatedCost)).constructor.name === "Number") {
                setInputs({ ...inputs, initialDeposit: (((parseFloat(inputs.estimatedCost)) * 0.1).toFixed(4)).toString() });
            }
        }

        return () => {

        }
    }, [inputs.estimatedCost]);


    return (<Fragment>
        <div style={{ height: '100vh' }}>
            <Navbar />
            <div className={` ${centerDiv}`} style={{ justifyContent: 'center' }}>

                {/* title heading */}
                <div className={`card  col-md-4`}>
                    <div className="px-4">
                        <h2 className="my-4">Insurance Application</h2>

                        {/*  */}
                        <form onSubmit={handleSubmit}>
                            <div className={` ${divRelative} `}>

                                <div className="py-4 ">
                                    <div className="row mb-4">

                                        <div className={`  form-group ${has_search}`}>
                                            {renderHInput('What to Insure', `${employInfoLeftIn} ${dIcon} mr-sm-2`, '', 'Name of good to insure', 'text', 'insureName', inputs, errors,
                                                <span className={`${dIcon_feedback} `}><img src={inputL} alt="bvn visual" width='15' /></span>)}

                                            {errors && errors.insureName ?
                                                <div className={` ${validationErrMsg}`}>{'invalid insurer Name '}</div> : ""}
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className={`form-group ${has_search} `}>
                                            {renderHInput('Estimated Cost', `${employInfoLeftIn} ${dIcon} mr-sm-2`, '', 'Estimated cost ($)', 'text', 'estimatedCost', inputs, errors,
                                                <span className={`${dIcon_feedback} `}><img src={inputL} alt="estimate-cost" width='15' /></span>)}

                                            {/* error */}
                                            {errors && errors.estimatedCost ?
                                                <div className={` ${validationErrMsg}`}>{'invalid estimate cost '}</div> : ""}
                                        </div>
                                    </div>
                                    <div className="row my-4">
                                        <div className={` form-group ${has_search}`}>
                                            {renderHInput('Estimated Tenure', `${employInfoLeftIn} ${dIcon} mr-sm-2`, '', 'Estimated tenure of insurance (months)', 'text', 'estimatedTenure', inputs, errors,
                                                <span className={`${dIcon_feedback} `}><img src={inputL} alt="estimate-cost" width='15' /></span>)}

                                            {/* error */}
                                            {errors && errors.estimatedTenure ?
                                                <div className={` ${validationErrMsg}`}>{'invalid estimate cost '}</div> : ""}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className={` form-group ${has_search}`}>
                                            {renderHInputDisabled('Initial deposit(BUSD) 10% of Estimated Cost', `${employInfoLeftIn} ${dIcon} mr-sm-2`, '', 'Initial deposit (BUSD) 10% of Estimated Cost', 'text', 'initialDeposit', inputs, errors,
                                                <span className={`${dIcon_feedback} `}><img src={inputL} alt="estimate-cost" width='15' /></span>)}

                                            {/* error */}
                                            {errors && errors.initialDeposit ?
                                                <div className={` ${validationErrMsg}`}>{'invalid initial deposit '}</div> : ""}
                                        </div>
                                    </div>

                                    <div className="row my-4">
                                        <div className={` form-group ${has_search}`}>
                                            {renderHInputDisabled('Insurer Engine Address', `${employInfoLeftIn} ${dIcon} mr-sm-2`, '', 'Insurer Engine Address', 'text', 'insurerAddress', inputs, errors,
                                                <span className={`${dIcon_feedback} `}><img src={inputL} alt="estimate-cost" width='15' /></span>)}

                                            {/* error */}
                                            {errors && errors.insurerAddress ?
                                                <div className={` ${validationErrMsg}`}>{'invalid insurer engine address '}</div> : ""}
                                        </div>
                                    </div>

                                    <div className="text-center" style={{ marginTop: '3vh', width: '100%' }} >
                                        {renderButtonH("", "Deposit / Submit", `${formSubmitButton} ml-2`, disableSubmitBtn, "submit", {})}

                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    </Fragment>);
}

export default InsuranceApply;