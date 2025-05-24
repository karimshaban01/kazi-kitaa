import { useState  } from "react";
import '../App.css';
import HeaderNav from "./Header";

export default function ProfileScreen (){
    return (
        <>
        <HeaderNav></HeaderNav>
            <div className="new-body">
                <h1>
                    Profile...
                </h1>
            </div>
        </>
    );
}