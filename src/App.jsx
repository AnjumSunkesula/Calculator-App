import './App.css'
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDivide, faMinus, faPlus, faXmark, faEquals, faClock, faRulerHorizontal, faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import Keypad from './components/keypad';
import ScaleConverter from './components/ScaleConverter/scaleConverter';

function App() {

	const [display, setDisplay] = useState(""); // State to manage the input and result
	const [history, setHistory] = useState([]);
	const [view, setView] = useState('calculator');

	const toggleView = () => {
		setView((prevView) => (prevView === 'calculator' ? 'scaleConverter' : 'calculator'));
	};
	
	const handleClick = (value) => {
		if (React.isValidElement(value)) {
			const operator = getIconSymbol(value);                      // getIconSymbol function converts icons to their corresponding operators
			setDisplay((prev) => prev + operator);                      // Append the operator symbol as string
		} else if (value === "=") {                                     // If the value is "=" (equal sign), calculate the result
			try {
				const openCount = (display.match(/\(/g) || []).length;   //automatically balance parantheses before evaluation
				const closeCount = (display.match(/\)/g) || []).length;

				let balancedDisplay = display;
				if (openCount > closeCount) {
					balancedDisplay += ")".repeat(openCount - closeCount); // Add missing closing parentheses
				}

				const result = eval(balancedDisplay);                    //evaluate the balanced expression
                setDisplay(result.toString());
                setHistory((prevHistory) => [                           //store the calculation and result in history
                    ...prevHistory,
                    `${balancedDisplay} = ${result}`
                ]);
			} catch {
				setDisplay("Error");                                     // Show error if there is a syntax issue in the expression
			}
		} else if (value === "()") {                                     // Handle parentheses logic
			const lastChar = display[display.length - 1];

			if (!display || "+-*/(".includes(lastChar)) {                // Append "(" if it's the beginning or after an operator
				setDisplay((prev) => prev + "(");
			} else {                                                     // Append ")" if there’s a matching open parenthesis
				const openCount = (display.match(/\(/g) || []).length;
				const closeCount = (display.match(/\)/g) || []).length;
				if (openCount > closeCount) {
					setDisplay((prev) => prev + ")");
				} else {
					setDisplay((prev) => prev + "*(");
				}
			}
        } else if (value === "+/-"){
			const regex = /(-?\d+(\.\d*)?)$/; // This matches the last number, including negative numbers and decimals
			const match = display.match(regex);

			if (match) {
			const lastNumber = match[0];	
			const newNumber = lastNumber.startsWith("-")
				? lastNumber.slice(1) // Remove negative sign
				: "-" + lastNumber;   // Add negative sign
			    setDisplay((prev) => prev.slice(0, -lastNumber.length) + newNumber);
			}
		} else if (!isNaN(value) || value === '.') {
			const lastChar = display[display.length - 1];
			if (lastChar === ")") {
				setDisplay((prev) => prev + "*" + value);
			} else {
				setDisplay((prev) => prev + value);
			}
		} else {
			setDisplay((prev) => prev + value);
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

 
	// CLEAR THE DISPLAY
	const handleClear = () => {
		setDisplay("");
	}
	
	// DELETE CHARACTER BY ONE
	const handleDelete = () => {
		setDisplay((prev) => prev.slice(0, -1));  //removes the last character.-1 cuz it removes the single digit also 
	}

	// STORING PREVIOUS CALCULATIONS
	const handleStoreHistory = () => {
		const historyString = history.join("\n");
		setDisplay(historyString);
	}
	// CLEARING HISTORY
	const handleClearHistory = () => {
		setHistory([]);
		setDisplay("");
	}

    
	
	return(
		<>
			<div className='container'>
				{view === 'calculator' && (
					<>
					    <div className='display'>
							{display || <span className='cursor'></span>}
						</div>
						{history.length > 0 && display === history.join("\n") && (
							<button onClick={handleClearHistory} className='clear-history'>Clear history</button>
						)}
						<div className='math-icons'>
							<div className='jBSwj'>
								<FontAwesomeIcon icon={faClock} onClick={handleStoreHistory} className='icon'/>
								<FontAwesomeIcon 
									icon={faRulerHorizontal} 
									onClick={toggleView} 
									className='icon'
								/>
								<div className='icon-container'>
									<span>&#8730;</span> 
									<span>&#960;</span> 
									<span>&#949;</span>
									<span>=</span> 
								</div>
							</div>
							<div className='JHWha'>
								<FontAwesomeIcon icon={faDeleteLeft} onClick={handleDelete}  className='icon'/>
							</div>
						</div>
				        <Keypad handleClick={handleClick} handleClear={handleClear} handleDelete={handleDelete} ScaleConverter={ScaleConverter}/>
					</>
			    )}

				{view === 'scaleConverter' && (
			        <ScaleConverter toggleView={toggleView} handleClick={handleClick} display={display}/>
				)}

			</div>
			
		</>
	);
}
export default App