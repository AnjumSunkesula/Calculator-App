import './App.css'
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDivide, faMinus, faPlus, faXmark, faEquals, faClock, faRulerHorizontal, faDeleteLeft} from '@fortawesome/free-solid-svg-icons'

function App() {

	const [display, setDisplay] = useState(""); // State to manage the input and result

    const handleClick = (value) => {
    if (value === "=") {
      try {
        setDisplay(eval(display)); // Calculate the result (use eval carefully)
      } catch {
        setDisplay("Error");
      }
    } else if (value === "C") {
      setDisplay(""); // Clear the display
    } else {
      setDisplay(display + value); // Append input
    }
  };
    
	
	return(
		<>
		    {/* <div className='container'>
				<div className="display">{display || "0"}</div>
				<div className="buttons">
					{["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((item) => (
					<button key={item} onClick={() => handleClick(item)}>
						{item}
					</button>
					))}
					<button className="clear" onClick={() => handleClick("C")}>
					C
					</button>
				</div>
				<div>calculator</div>
			</div> */}
			<div className='container'>
				<div>
					display
				</div>
				<div className='math-icons'>
					<div className='jBSwj'>
						<FontAwesomeIcon icon={faClock} className='icon'/>
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
							<button className='clear'>C</button>
						</div>
						<div>
							<button className='green'>( )</button>
						</div>
						<div>
							<button className='green'>%</button>
						</div>
						<div>
							<button className='green'><FontAwesomeIcon icon={faDivide} /></button>
						</div>
					</div>
					<div className='rows'>
						<div>
							<button>7</button>
						</div>
						<div>
							<button>8</button>
						</div>
						<div>
							<button>9</button>
						</div>
						<div>
							<button className='green'><FontAwesomeIcon icon={faXmark} /></button>
						</div>
					</div>
					<div className='rows'>
						<div>
							<button>4</button>
						</div>
						<div>
							<button>5</button>
						</div>
						<div>
							<button>6</button>
						</div>
						<div>
							<button className='green'><FontAwesomeIcon icon={faMinus} /></button>
						</div>
					</div>
					<div className='rows'>
						<div>
							<button>1</button>
						</div>
						<div>
							<button>2</button>
						</div>
						<div>
							<button>3</button>
						</div>
						<div>
							<button className='green'><FontAwesomeIcon icon={faPlus} /></button>
						</div>
					</div>
					<div className='rows'>
						<div>
							<button>+/-</button>
						</div>
						<div>
							<button>0</button>
						</div>
						<div>
							<button>.</button>
						</div>
						<div>
							<button className='equal-button'><FontAwesomeIcon icon={faEquals} /></button>
						</div>
					</div>
 

				</div>

			</div>
			
		</>
	);

  
}

export default App
