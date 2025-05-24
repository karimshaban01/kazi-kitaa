import { useState } from "react";
import '../App.css';
import HeaderNav from "./Header";

export default function RequestPaymentScreen(){
    return (
        <>
            <HeaderNav></HeaderNav>
            <div className="new-body">
                <h2>
                    Request payment for job ...
                </h2>
            </div>
        </>
    );
}