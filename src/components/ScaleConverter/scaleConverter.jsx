import './scaleConverter.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Keypad from '../keypad';





function ScaleConverter ({ toggleView, handleClick }) {

    const [inputValue, setInputValue] = useState("1");
    const [currentCategory, setCurrentCategory] = useState("Length");
    const [fromUnit, setFromUnit] = useState("Inches");
    const [toUnit, setToUnit] = useState("Centimeters");

    // Units and conversion factors
    const categories = {
        Length: {
            units: ["Inches", "Centimeters", "Millimeters", "Meters", "Feet", "Yards"],
            conversion: {
                Inches: { Centimeters: 2.54, Millimeters: 25.4, Meters: 0.0254, Feet: 0.0833, Yards: 0.0278 },
                Centimeters: { Inches: 0.3937, Millimeters: 10, Meters: 0.01, Feet: 0.0328, Yards: 0.0109 },
                // Add more conversions as needed
            },
        },
        Area: {
            units: ["Square Meters", "Square Kilometers", "Acres", "Hectares"],
            conversion: {
                // Define conversions here
            },
        },
        // Add more categories (Temperature, Volume, etc.)
    };


    

    const handleKeypadClick = (key) => {
        if (key === "C") {
            setInputValue(""); // Clear input
        } else if (key === "←") {
            setInputValue((prev) => prev.slice(0, -1)); // Remove last digit
        } else {
            setInputValue((prev) => (prev === "0" ? key : prev + key)); // Append digit
        }
    };

    // Perform the conversion
    const performConversion = (value) => {
        const numValue = parseFloat(value) || 0;
        const conversionFactor = categories[currentCategory].conversion[fromUnit][toUnit];
        return (numValue * conversionFactor).toFixed(2);
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

                <div className="categories">
                    {Object.keys(categories).map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setCurrentCategory(category);
                                setFromUnit(categories[category].units[0]);
                                setToUnit(categories[category].units[1]);
                                setInputValue("1");
                            }}
                            className={currentCategory === category ? "active" : ""}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                 <div className="conversion-display">
                <div className="from-unit">
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                    >
                        {categories[currentCategory].units.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                    <span>
                        {inputValue} {fromUnit.slice(0, 2).toLowerCase()}
                    </span>
                </div>
                <div className="to-unit">
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                    >
                        {categories[currentCategory].units.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                    <span>
                        {performConversion(inputValue)} {toUnit.slice(0, 2).toLowerCase()}
                    </span>
                </div>
            </div>

                 

                

                



                

                 


            </div>
            <Keypad handleClick={handleKeypadClick}/>
        </>
    );
}
export default ScaleConverter;