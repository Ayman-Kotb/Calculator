import React from "react";
import "./style.css"
import Display from "../Display/index.tsx";
//import styled from "styled-components";
/*function Header(){
  return <h1>React Calculator</h1> ;
}*/
'use client';
export default function Buttons({onButtonClick}) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+/-"];
  const buttons = ["%", "CE", "C", "DEL", "1/x", "x²", "√x", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "+/-", "0", ".", "="];
  return (
    <>
        <div id="keys">
          {buttons.map((x) => (
            (numbers.includes(x)) ?
              <button  onClick={() => onButtonClick(x)} key={x} >{x}</button> :
              <button  onClick={() => onButtonClick(x)} key={x} id="operator">{x}</button>

          ))}
        </div>
      
    </>

  );

}
