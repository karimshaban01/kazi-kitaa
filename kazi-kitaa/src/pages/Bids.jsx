import { useState } from "react";
import '../App.css';
import HeaderNav from "./Header";

export default function BidsScreen (){
    return (
        <>
        <HeaderNav></HeaderNav>
            <div className="new-body">
                <h2>
                    Bids available for job ...
                </h2>
            </div>
        </>
    );
}