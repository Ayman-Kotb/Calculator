import React from "react";
import "./style.css"
export default function Display({value}) {
    return(
        <input type="text" value={value} readOnly id="display"/>  
    );
}