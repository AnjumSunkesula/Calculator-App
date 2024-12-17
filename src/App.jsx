import './App.css'
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDivide, faMinus, faPlus, faXmark, faEquals, faClock, faRulerHorizontal, faDeleteLeft} from '@fortawesome/free-solid-svg-icons'

function App() {

	const [display, setDisplay] = useState(""); // State to manage the input and result
	
	// const handleInput = (value) => {
	// 	setDisplay(display + value)

	// }

	const handleClick = (value) => {
		if (React.isValidElement(value)) {
			const operator = getIconSymbol(value); // Extract the operator from the icon
			setDisplay((prev) => prev + operator); // Append the operator symbol as string
		} else if (value === "=") {          // If the value is "=" (equal sign), calculate the result
			try {
				const result = eval(display);
                setDisplay(result.toString());

                // Store the calculation and result in history
                setHistory((prevHistory) => [
                    ...prevHistory,
                    `${display} 
					${result}`
                ]);
			} catch {
				setDisplay("Error"); // Show error if there is a syntax issue in the expression
			}
		} else {    // if it's a string (num or operator), append it to the display                           
			setDisplay(display + value);   
		}
	};

	const getIconSymbol = (icon) => {
		switch (icon.props.icon) {
			case faPlus:
				return "+";
			case faMinus:
				return "-";
			case faXmark:
				return "*";
			case faDivide:
				return "/";
			case faEquals:
				return "=";
			default:
				return ""; // Return empty string if no match
		}
	};


	const handleClear = () => {
		setDisplay("");
	}
	
	// storing previous calculations
	const [history, setHistory] = useState('');

	const handleStoreHistory = () => {
		const historyString = history.join("\n");
		setDisplay(historyString);

	}
    
	
	return(
		<>
			<div className='container'>
				<div className='display'>
					{display || "0"}
				</div>
				<div className='math-icons'>
					<div className='jBSwj'>
						<FontAwesomeIcon icon={faClock} onClick={handleStoreHistory} className='icon'/>
						<FontAwesomeIcon icon={faRulerHorizontal} className='icon'/>
						<div className='icon-container'>
							<span>&#8730;</span> 
							<span>&#960;</span> 
							<span>&#949;</span>
							<span>=</span> 
						</div>
					</div>
					<div className='JHWha'>
						<FontAwesomeIcon icon={faDeleteLeft}  className='icon'/>
					</div>
				</div>
				<div className='button-wrapper'>
					<div className='rows'>
						<div>
							<button className='clear' onClick={handleClear}>C</button>
						</div>
						<div>
							<button className='green'>( )</button>
						</div>
						<div>
							<button className='green' onClick={() => handleClick("%")}>%</button>
						</div>
						<div>
							<button className='green' onClick={() => handleClick("/")}><FontAwesomeIcon icon={faDivide} /></button>
						</div>
					</div>
					<div className='rows'>
						{["7", "8", "9", <FontAwesomeIcon icon={faXmark}/>].map((item, index) => (
							<button key={index} onClick={() => handleClick(item)}>
								{item}
							</button>
						))}
					</div>
					<div className='rows'>
						{["4", "5", "6", <FontAwesomeIcon icon={faMinus}/>].map((item, index) => (
							<button key={index} onClick={() => handleClick(item)}>
								{item}
							</button>
						))}
					</div>
					<div className='rows'>
						{["1", "2", "3", <FontAwesomeIcon icon={faPlus}/>].map((item, index) => (
							<button key={index} onClick={() => handleClick(item)}>
								{item}
							</button>
						))}
					</div>
					<div className='rows'>
						{["+/-", "0", ".", "="].map((item, index) => (
							<button key={index} onClick={() => handleClick(item)}>
								{item}
							</button>
						))}
					</div>
				</div>

			</div>
			
		</>
	);

  
}

export default App
