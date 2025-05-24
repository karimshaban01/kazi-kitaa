import { useState } from "react";
import '../App.css';
import HeaderNav from "./Header";

export default function ReviewScreen(){
    return (
        <>
        <HeaderNav></HeaderNav>
        <div className="new-body">
            <h2>
                Reviews for job ...
            </h2>
        </div>
        </>
    );
}