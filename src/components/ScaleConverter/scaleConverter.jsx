import './scaleConverter.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Keypad from '../keypad';





function ScaleConverter ({ toggleView, handleClick }) {

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [conversionType, setConversionType] = useState("cmToIn"); // Default conversion type

    // Conversion logic
    const handleConvert = () => {
        if (conversionType === "cmToIn") {
            setOutput((parseFloat(input) / 2.54).toFixed(2)); // cm to inches
        } else if (conversionType === "inToCm") {
            setOutput((parseFloat(input) * 2.54).toFixed(2)); // inches to cm
        }
        // Add other conversion types as needed
    };




    return(
        <>
            <div className="scale-converter">
                <div className='header'>
                    <div>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            onClick={toggleView} // Go back to calculator
                        />
                    </div>
                    <div className='heading'>Unit Converter</div>
                </div>
                <div className="conversion-options">
                    <select
                        value={conversionType}
                        onChange={(e) => setConversionType(e.target.value)}
                    >
                        <option value="cmToIn">Centimeters to Inches</option>
                        <option value="inToCm">Inches to Centimeters</option>
                        {/* Add more conversion options */}
                    </select>
                </div>
            </div>
            <Keypad handleClick={handleClick}/>
        </>
    );
}
export default ScaleConverter;