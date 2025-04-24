import './App.css'
import React, { useState, useEffect } from "react";
import { evaluate } from 'mathjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDivide, faMinus, faPlus, faXmark, faEquals, faClock, faRulerHorizontal, faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import Keypad from './components/keypad';
import ScaleConverter from './components/ScaleConverter/scaleConverter';

function App() {

	const [display, setDisplay] = useState("");                       // State to manage the input and result
	const [history, setHistory] = useState([]);
	const [view, setView] = useState('calculator');
	const [activeField, setActiveField] = useState('from');

	const toggleView = () => {
		setView((prevView) => (prevView === 'calculator' ? 'scaleConverter' : 'calculator'));
	};
	
	const handleClick = (value) => {
		if (React.isValidElement(value)) {                              //checks if the value is a react elemrnt(an icon button)
			const operator = getIconSymbol(value);                      // getIconSymbol function converts icons into their corresponding operators(+, -, *, /)
			setDisplay((prev) => prev + operator);                      // Append the operator symbol as string
		} else if (value === "=") {                                     // If the value is "=" (equal sign), calculate the result
			try {
				const openCount = (display.match(/\(/g) || []).length;  // number of (
				const closeCount = (display.match(/\)/g) || []).length; // number of )

				let balancedDisplay = display;                             // store the expression in a new variable for processing
				if (openCount > closeCount) {                              // += : In JavaScript, strings are immutable, meaning you cannot change a part of an existing string.Instead, you create a new string by adding (concatenating) characters to the existing one.with just = it would be error.
					balancedDisplay += ")".repeat(openCount - closeCount); // opencount-closecount: tells us how many ) to add.adds missing closing parantheses
				}

				const result = evaluate(balancedDisplay);  // Using mathjs instead of eval().evaluating the balanced expression
				setDisplay(result.toString());

				setHistory((prevHistory) => [
					...prevHistory, 
					`${balancedDisplay} = ${result}`
				]);
			} catch {
				setDisplay("Error");
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
			const regex = /(-?\d+(\.\d*)?)$/;                 // This matches the last number, including negative numbers and decimals
			const match = display.match(regex);

			if (match) {
			const lastNumber = match[0];	
			const newNumber = lastNumber.startsWith("-")
				? lastNumber.slice(1)                         // Remove negative sign
				: "-" + lastNumber;                           // Add negative sign
			    setDisplay((prev) => prev.slice(0, -lastNumber.length) + newNumber);
			}
		} else if (!isNaN(value) || value === '.') {         //checks if the input "value" is a number or a decimal point
			const lastChar = display[display.length - 1];    // get the last character of the current display

			if (lastChar === ")") {
				setDisplay((prev) => prev + "*" + value);    //insert a * before adding the number [ (2+3)5 => (2+3)*5 ]
			} else {
				setDisplay((prev) => prev + value);          // otherwise, just append the number or . as it is
			}
		} else {
			setDisplay((prev) => prev + value);              // append any other char (such as an operator) directly to the display
		}                                                    // append means adding something to the end of an existing value. setDisplay((prev) => prev + value); 1. prev holds the current value of display. 2. value is what the user just pressed (num, operator). 3. prev + value takes the existing display and adds a new input at the end[display=7,user presses . value, display=7.]. 4. setDisplay(...) updates the display state with this new value.                    
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
			if (key === "+") handleClick("+");
			if (key === "-") handleClick("-");
			if (key === "*") handleClick("*"); 
			if (key === "/") handleClick("÷"); 
			if (key === "%") handleClick("%");

			// Brackets
			if (key === "(") handleClick("(");
			if (key === ")") handleClick(")");

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
		setDisplay(history.join("\n"));
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
							</div>
							<div className='JHWha'>
								<FontAwesomeIcon icon={faDeleteLeft} onClick={handleDelete}  className='icon'/>
							</div>
						</div>
				    <Keypad handleClick={handleClick} handleClear={handleClear} handleDelete={handleDelete} ScaleConverter={ScaleConverter}/>
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