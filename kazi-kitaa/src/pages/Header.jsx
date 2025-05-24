import { useState } from "react";
import '../App.css';

export default function HeaderNav (){
    return (
        <div className="top-nav">
            <a href="/">Nyumbani</a>
            <a href="/jobs">Kazi</a>
            <a href="/regions">Mkoa</a>
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
            <a href="/new">Ongeza kazi</a>
            <a href="/profile">Profaili yangu</a>
        </div>
    );
}