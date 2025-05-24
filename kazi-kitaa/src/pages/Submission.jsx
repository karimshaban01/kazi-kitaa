import { useState } from "react";
import "../App.css";
import HeaderNav from "./Header";

export default function SubmissionScreen(){
    return (
        <>
        <HeaderNav></HeaderNav>
            <div className="new-body">
                <h2>
                    Job submission ...
                </h2>
            </div>
        </>
    );
}