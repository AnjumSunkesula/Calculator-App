import './App.css'
import React, { useState, useEffect } from "react";
import { evaluate } from 'mathjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDivide, faMinus, faPlus, faXmark, faEquals, faClock,  faCalculator, faRulerHorizontal, faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import Keypad from './components/keypad';
import ScaleConverter from './components/ScaleConverter/scaleConverter';

function App() {

	const [display, setDisplay] = useState("");                       // State to manage the input and result
	const [history, setHistory] = useState([]);
	const [showHistory, setShowHistory] = useState(false);
	const [view, setView] = useState('calculator');
	const [activeField, setActiveField] = useState('from');
	const [result, setResult] = useState("");
	const [showResultOnly, setShowResultOnly] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);



	const toggleView = () => {
		setView((prevView) => (prevView === 'calculator' ? 'scaleConverter' : 'calculator'));
		setDisplay('');
		setResult('');
	};
	
	const handleClick = (value) => {
		if (React.isValidElement(value)) {                              //checks if the value is a react elemrnt(an icon button)
			const operator = getIconSymbol(value);
			const lastChar = display[display.length - 1] || '';

			let newDisplay = display;

			if (display === '') {
				showMessage("Invalid format used");
				return; //block starting with any operator
			}

			if ("+-*/".includes(lastChar)) {
				// If last character is an operator, replace it
				newDisplay = display.slice(0, -1) + operator;
			}  else {
				// Otherwise, append the new operator
				newDisplay += operator;
			}

			setDisplay(newDisplay);
		  liveEvaluate(newDisplay);
		  setShowResultOnly(false);                                  // Append the operator symbol as string

		} else if ("+-*/".includes(value)) {
			// Handle keyboard input for operators
			const lastChar = display[display.length - 1] || '';
			let newDisplay = display;
	
			if (display === '') {
				showMessage("Invalid format used");
				return; // Block starting with any operator
			}
	
			if ("+-*/".includes(lastChar)) {
				newDisplay = display.slice(0, -1) + value; // Replace last operator
			} else {
				newDisplay += value;
			}
	
			setDisplay(newDisplay);
			liveEvaluate(newDisplay);
			setShowResultOnly(false);
	
		} else if (value === "=") {                                     // If the value is "=" (equal sign), calculate the result
			try {
				const openCount = (display.match(/\(/g) || []).length;  // number of (
				const closeCount = (display.match(/\)/g) || []).length; // number of )

				let balancedDisplay = display;                             // store the expression in a new variable for processing

				if (openCount > closeCount) {                              // += : In JavaScript, strings are immutable, meaning you cannot change a part of an existing string.Instead, you create a new string by adding (concatenating) characters to the existing one.with just = it would be error.
					balancedDisplay += ")".repeat(openCount - closeCount); // opencount-closecount: tells us how many ) to add.adds missing closing parantheses
				}

				const result = evaluate(balancedDisplay);  // Using mathjs instead of eval().evaluating the balanced expression
				setResult(result.toString());
				setShowResultOnly(true);
				setDisplay(result.toString());
				setHistory((prev) => [...prev,`${balancedDisplay} = ${result}`]);
			} catch {
				setDisplay("Error");
				// setResult('Error')
			}
			
		} else if (value === "()") {                                     // Handle parentheses logic
			const lastChar = display[display.length - 1];
			let newDisplay = display;

			if (!display || "+-*/(".includes(lastChar)) {                // Append "(" if it's the beginning or after an operator
				newDisplay += "(";
			} else {                                                     // Append ")" if there’s a matching open parenthesis
				const open = (display.match(/\(/g) || []).length;
				const close = (display.match(/\)/g) || []).length;
				newDisplay += open > close ? ")" : "*(";
			}
			setDisplay(newDisplay);
		  liveEvaluate(newDisplay);
		  setShowResultOnly(false);

    } else if (value === "+/-"){
			const regex = /(-?\d+(\.\d*)?)$/;                 // This matches the last number, including negative numbers and decimals
			const match = display.match(regex);

			if (match) {
			  const lastNumber = match[0];	
			  const toggled = lastNumber.startsWith("-") ? lastNumber.slice(1) : "-" + lastNumber;                        // Remove negative sign                           // Add negative sign
			  const newDisplay = display.slice(0, -lastNumber.length) + toggled;
			  setDisplay(newDisplay);
			  liveEvaluate(newDisplay);
			}
			setShowResultOnly(false);

		} else if (value === '%') {
			
			const lastChar = display[display.length - 1];

			if (lastChar === '%' ||  "+-*/".includes(lastChar) || !lastChar) {
				showMessage("Invalid format used");
				return;
			}

			let newDisplay = display + '%';

			setDisplay(newDisplay);
			liveEvaluate(newDisplay);
			setShowResultOnly(false);
			
		} else if (!isNaN(value) || value === '.') {         //checks if the input "value" is a number or a decimal point
			const lastChar = display[display.length - 1];    // get the last character of the current display
      let newDisplay = display;

			// If previous char is %, insert * before adding number or decimal
			if (lastChar === '%') {
        newDisplay += '*';
      }

			const parts = newDisplay.split(/[\+\-\*\/\(\)]/); // split by operators
			const currentNumber = parts[parts.length - 1];

			if( value === '.' && (currentNumber === '' || /[+\-*/(]$/.test(newDisplay))){
				newDisplay += '0.';
			} else {
				if (value === '0' && /^0+$/.test(currentNumber) && !currentNumber.includes('.')) {    // Prevent multiple leading zeroes unless followed by a decimal point
					return; // block more than one leading zero
				}
				if (value === '.' && currentNumber.includes('.')) {         // Prevent multiple decimals in the same number
					return; //block multiple dots in a number
				}
				newDisplay += value;
			}
			
			setDisplay(newDisplay);
			liveEvaluate(newDisplay);
			setShowResultOnly(false);

		} else {
			const newDisplay = display + value;
			setDisplay(newDisplay);
			liveEvaluate(newDisplay);
			setShowResultOnly(false);
		}
	};   

	const liveEvaluate = (expression) => {
    // Show preview only if the expression contains at least one number and ends with a valid operator
		const hasOperator = /[+\-*/]/.test(expression);
		const endsWithNumber = /\d$/.test(expression);

		if (hasOperator && endsWithNumber) {
			try {
				const result = evaluate(expression); // Using mathjs or your eval method
				setResult(result.toString());
			} catch {
				setResult(""); // If expression is invalid, hide the result
			}
		} else {
			setResult(""); // Don't show preview yet
		}
	};

		
	const showMessage = (msg) => {
		setToastMessage(msg);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 1000);
	};
	
	
	const handleArrowKeys = (direction) => {
		if (direction === "up" && activeField !== "from") {
			setActiveField("from");
		} else if (direction === "down" && activeField !== "to") {
			setActiveField("to");
		}
	};


	useEffect(() => {
		const handleKeyPress = (event) => {
			const key = event.key;

			// Digits and decimal
			if (!isNaN(key) || key === ".") {
				handleClick(key);
			}

			// Operators
			if ("+-*/%".includes(key)) {
				handleClick(key);
			}

			// Brackets
			if (key === "(" || key === ")") {
				handleClick("()");
			}

			// Enter and equals
			if (key === "Enter" || key === "=") handleClick("=");

			// Special keys
			if (key === "Backspace") handleDelete();
			if (key === "C" || key === 'c') handleClear();

			if (key === "~") handleClick("+/-"); // just an example key for toggle

			// Arrow keys
			if (key === "ArrowUp") handleArrowKeys("up");
			if (key === "ArrowDown") handleArrowKeys("down");
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleClick, handleArrowKeys]);


	

	const getIconSymbol = (icon) => {
		console.log("Icon clicked:", icon.props.icon);
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
		setResult('');
		setShowResultOnly(false);
	}
	
	// DELETE CHARACTER BY ONE
	const handleDelete = () => {
    if (showResultOnly) {
			setResult((prev) => {
				const updated = prev.slice(0, -1);
				if (updated === '') {
					setShowResultOnly(false); // exit result mode when nothing left
					setDisplay('');            // clear display too
				}
				return updated;
		  });
    } else {
			setDisplay((prev) => {
				const updated = prev.slice(0, -1);
				liveEvaluate(updated); // live evaluate after deleting
				return updated;
			});
    }
  };

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
						<div className="display">
							{!showResultOnly && (
								<div className="equation">
									<span className='display-content'>
										{display}
									<span className="cursor"></span> {/* Cursor always shown after the display */}
									</span>
								</div>
							)}
							<div className={`result-preview ${showResultOnly ? 'slide-up' : ''}`}>
								{result}
							</div>
						</div>
						
						<div className='math-icons'>
							<div className='jBSwj'>
								<FontAwesomeIcon icon={!showHistory ? faClock : faCalculator} onClick={() => setShowHistory(prev => !prev)} className='icon'/>
								<FontAwesomeIcon 
									icon={faRulerHorizontal} 
									onClick={toggleView} 
									className='icon'
								/>
							</div>
							<div className='JHWha'>
								<FontAwesomeIcon icon={faDeleteLeft} onClick={handleDelete}  className='icon'/>
							</div>
						</div>

						<div className='keypad-wrapper' style={{ position: 'relative' }}>
					    {showToast && <div className="toast-message">{toastMessage}</div>}
							{!showHistory ? (
								<Keypad 
									handleClick={handleClick} 
									handleClear={handleClear} 
									handleDelete={handleDelete} 
									ScaleConverter={ScaleConverter}
									handleArrowKeys={handleArrowKeys}
									activeField={activeField}
									
								/>
							) : (
								<div className="history-view">
									{history.length > 0 ? (
										<>
											<div className="history-list">
												{history.map((item, index) => (
													<div key={index} className="history-item">
														{item}
													</div>
												))}
											</div>
											<button onClick={handleClearHistory} className='clear-history'>Clear history</button>
										</>
									) : (
										<div className="no-history">No history available</div>
									)}
								</div>
							)}
						</div>
					</>
			  )}

         
				{/* need to pass handleclear and handledelete to scaleconveter too so that the imported keypad in the scaleconverter could have access to the functions.
				those two functions are passed to keypad component above for calculator.need to pass them for both components. */}
				{view === 'scaleConverter' && (
			    <ScaleConverter toggleView={toggleView} handleClick={handleClick} display={display} handleClear={handleClear} handleDelete={handleDelete} handleArrowKeys={handleArrowKeys} activeField={activeField}/>
				)}

			</div>
		</>
	);
}
export default App