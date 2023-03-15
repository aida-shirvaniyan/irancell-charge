import React, {useContext, useState} from 'react';
import styles from "./Shopping.module.css";
import {TypeContext} from "../context/TypeContextProvider";
import Bill from "./Bill";
import Parsian from "../assets/PARO.png"
import Melat from "../assets/MLT.png"

const Shopping = () => {
    const {state, dispatch} = useContext(TypeContext);
    const [data, setData] = useState({
        phoneNumber: "",
        email: "",
        bank: "",
        default: 20000,
        more: false,
        showBanks: false,
        error: false,
        shortage: false,
        disable: false
    });
    const changeHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
    }
    const priceHandler = event => {
        dispatch({type: "CHOSEN", payload: event.target.value})
    }
    const setClass = price => {
        if (state.price === price) {
            return styles.Active
        }
        return styles.priceInactive
    }
    const SubmitHandler = () => {
        if (data.phoneNumber.length === 11 && Number(state.price) >= 10000) {
            setData({...data, error:false, shortage:false, showBanks: true , disable: true})
        }else if(Number(state.price) <= 10000){
            setData({...data, shortage :true})
        }
        else {
            setData({...data, error: true})
        }
    }
    const Reset = () => {
        setData({
            phoneNumber: "",
            email: "",
            bank: "",
            default: 20000,
            more: false,
            showBanks: false,
            error: false,
            shortage: false,
            disable: false
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.ShoppingContainer}>
                <div>
                    <h3>خرید آنلاین شارژ ایرانسل</h3>
                    <div className={styles.typeButtonContainer}>
                        <h6 className={styles.typeHeader}>نوع سیم‌کارت</h6>
                        <div>
                            <button className={(state.simType === "Credit") ? styles.Active : styles.Inactive}
                                    onClick={() => dispatch({type: "CREDIT"})} disabled={data.disable}>اعتباری
                            </button>
                            <button className={(state.simType === "Constant") ? styles.Active : styles.Inactive}
                                    onClick={() => dispatch({type: "CONSTANT"})} disabled={data.disable}>دائمی
                            </button>
                        </div>
                    </div>
                    <div className={styles.ToggleContainer}>
                        <label className={styles.switch}>
                            <input disabled={(state.disableIncredible , data.disable)} checked={state.incredible}
                                   name="incredible"
                                   type="checkbox" onChange={() => dispatch({type: "INCREDIBLE"})}/>
                            <span className={(!state.disableIncredible) ? styles.slider : styles.disable}></span>
                        </label>
                        {data.incredible}
                        شارژ شگفت انگیز
                    </div>
                    <label className={styles.Label}>شارژ تلفن همراه</label>
                    <input className={(data.error) ? styles.Error : styles.Input}
                           maxLength="11"
                           value={data.phoneNumber} name="phoneNumber"
                           onChange={changeHandler} disabled={data.disable}
                           type="text"
                    />
                    <div className={styles.priceButtonContainer}>
                        <h6>مبلغ شارژ</h6>
                        <div>
                            <button className={setClass("10000")} disabled={(state.incredible, data.disable)}
                                    onClick={() => dispatch({type: "CHOSEN", payload: "10000"})}><b>10,000</b> ریال
                            </button>
                            <button className={setClass("20000")} disabled={(state.incredible , data.disable)}
                                    onClick={() => dispatch({type: "CHOSEN", payload: "20000"})}><b>20,000</b> ریال
                            </button>
                            <button className={setClass("50000")} disabled={data.disable}
                                    onClick={() => dispatch({type: "CHOSEN", payload: "50000"})}><b>50,000</b> ریال
                            </button>
                            <button className={setClass("100000")} disabled={data.disable}
                                    onClick={() => dispatch({type: "CHOSEN", payload: "100000"})}><b>100,000</b> ریال
                            </button>
                            <button className={setClass("200000")} disabled={data.disable}
                                    onClick={() => dispatch({type: "CHOSEN", payload: "200000"})}><b>200,000</b> ریال
                            </button>
                            <button className={(data.more) ? styles.Active : styles.priceInactive}
                                    onClick={() => setData({...data, more: true})}
                                    disabled={(state.incredible , data.disable)}>سایر مبالغ
                            </button>
                        </div>
                    </div>
                    <div hidden={!data.more} className={styles.otherPrices}>
                        <label className={styles.Label}>مبلغ شارژ به ریال</label>
                        <input className={(data.shortage) ? styles.Error : styles.Input} value={state.price} name="price"
                               onChange={priceHandler}
                               type="text" disabled={data.disable}
                        />
                        <p className={data.shortage ? styles.errorMsg : styles.Hint}>حداقل 10,000 و حداکثر <span>{state.maximum.toLocaleString()}</span> ریال</p>
                    </div>
                    <label className={styles.Label}>ایمیل ( اختیاری )</label>
                    <input className={styles.Input} value={data.email} name="email" onChange={changeHandler}
                           type="text" disabled={data.disable}
                    />
                    <div className={styles.MobileBillContainer}>
                        <Bill data={data}/>
                    </div>
                    <div hidden={!data.showBanks} className={styles.Banks}>
                        <h5>انتخاب بانک :</h5>
                        <button className={data.bank === "بانک ملت" ? styles.Selected : styles.notSelected}
                                onClick={() => setData({...data, bank: "بانک ملت"})}><img src={Melat} alt="Bank"/></button>
                        <button className={data.bank === "بانک پارسیان" ? styles.Selected : styles.notSelected}
                                onClick={() => setData({...data, bank: "بانک پارسیان"})}><img src={Parsian} alt="Bank"/></button>
                    </div>
                    <button onClick={SubmitHandler} className={styles.Bank}>انتخاب بانک و پرداخت</button>
                    <button onClick={Reset} hidden={!data.showBanks} className={styles.cancel}>انصراف</button>
                </div>
            </div>
            <div className={styles.BillContainer}>
                <Bill data={data}/>
            </div>
        </div>
    );
};

export default Shopping;
