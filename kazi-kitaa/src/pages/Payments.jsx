import { useState } from "react";
import '../App.css';
import HeaderNav from "./Header";

export default function PaymentScreen (){
    return (
        <>
            <HeaderNav></HeaderNav>
            <div className="new-body">
                <h2>Payments for job ...</h2>
            </div>
        </>
    )
}