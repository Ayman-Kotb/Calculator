import React from "react";
import ReactDom from 'react-dom/client';
import Buttons from './components/Buttons/index.tsx';
import Display from './components/Display/index.tsx';
let x =0 ;    
export default function App() {
    const displayed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "÷", "×", "−", "%", ];
    const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
    const [screen, setScreen] = React.useState<String>('');
    const handleClick = (e) => {
        if (screen === "Error, Division by zero" || screen=== "Error, Invalid Experssion"){
            setScreen('');
            return ;
        }
        if (e === "C" || e === "CE" ) setScreen('');
        else if (e === "DEL") setScreen(screen.slice(0, -1));
        else if (e === "1/x") {
        setScreen( screen + '^(-1)');
        x=0 ;
        }
        else if (e === "x²"){
            setScreen(screen + '^2');
            x=0 ;
        }
        else if (e === "+/-"){
            if (screen[0] === "-") setScreen(screen.slice(1));
            else {
                if (screen[0]!=='(') setScreen('-('+screen+')');
                else setScreen('-'+screen);    
            }
        }
        else if (e === "=") {
            x=1;
            if (screen != "") {
                console.log(screen);
                const calc = async () => {
                    try{
                        const result = await fetch(
                            "http://localhost:8080/api/calculate",{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ expression: screen })
                            });
                        const data = await result.text();
                        
                        setScreen(String(data));    
                        }
                        catch(error){
                            console.error('Error:', error);
                            setScreen('Error');
                        }
                    };
                    calc();
            }
        }
        else if (e === "√x") {
            setScreen( screen + '^0.5');
            x=0 ;
        }
        else if (e === "." && screen[screen.length - 1] === ".") setScreen(screen);
        else if (displayed.includes(e)){
            if (numbers.includes(e) && x===1) {
                setScreen(""+e); 
                x = 0; 
            }
            else{
                setScreen(screen + e);
                x =0;
            } 
        } 
    };


    return (
        <main>
            <div id="calc">
                <Display value={screen} />
                <Buttons onButtonClick={handleClick} />
            </div>
        </main>
    );
}
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <App />
);