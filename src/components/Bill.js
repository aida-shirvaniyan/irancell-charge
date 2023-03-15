import React, {useContext} from 'react';
import styles from "./Bill.module.css"
import {TypeContext} from "../context/TypeContextProvider";

const Bill = ({data}) => {
    const {state} = useContext(TypeContext);
    const tax = (price) => {
        const Price = Number(price);
        const total = Price + ( Price * (9 / 100) );
        return total.toLocaleString();
    }
    return (
        <div>
            <h4 className={styles.title}>فاکتور نهایی</h4>
            <div className={styles.sections}>
                <p>نوع سیمکارت</p>
                <div>{state.title}</div>
            </div>
            <div className={styles.sections}>
                <p>مستقیم به شماره</p>
                <div>{data.phoneNumber ? data.phoneNumber : "---"}</div>
            </div>
            <div className={styles.sections}>
                <p className={styles.ResponsiveText}></p>
                <div>{(state.simType === "Credit") ? tax(state.price) : Number(state.price).toLocaleString()} ریال </div>
            </div>
            <div className={styles.sections}>
                <p>نوع شارژ</p>
                <div>{data.incredible ? "شگفت انگیز": "معمولی"}</div>
            </div>
            <div className={styles.sections}>
                <p>ایمیل</p>
                <div>{data.email ? data.email : "---"}</div>
            </div>
            <div className={styles.sections}>
                <p>نام بانک</p>
                <div>{data.bank ? data.bank : "---"}</div>
            </div>
        </div>
    );
};

export default Bill;
