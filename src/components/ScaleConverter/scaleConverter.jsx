import './scaleConverter.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Keypad from '../keypad';





function ScaleConverter ({ toggleView, handleClick }) {

    const [inputValue, setInputValue] = useState("1");
    const [currentCategory, setCurrentCategory] = useState("Length");
    const [fromUnit, setFromUnit] = useState("Inches");
    const [toUnit, setToUnit] = useState("Centimetres");

    // Units and conversion factors
    const categories = {
        Length: {
            units: ["Inches", "Centimetres", "Millimetres", "Metres", "Kilometres", "Feet", "Yards", "Miles", "Mils"],
            conversion: {
                Inches: { Centimetres: 2.54,  Millimetres: 25.4, Metres: 0.0254, Kilometers: 0.000025, Feet: 0.0833, Yards: 0.0278, Miles: 0.000015, Mils: 1000  },
                Centimetres: { Inches: 0.3937, Millimetres: 10, Metres: 0.01, Feet: 0.0328, Yards: 0.0109, Kilometres: 0.00001, Miles: 0.00000062, Mils: 393.7 },
                Metres: { Inches: 39.37, Millimetres: 1000,  Feet: 3.28, Yards: 1.09, Centimetres: 100, Kilometres: 0.001, Miles: 0.0006, Mils: 39370.07 },
                Millimetres : {Inches: 0.0393, Centimetres: 0.1, Meters: 0.001, Kilometres: 0.000001, Feet: 0.0032, Yards: 0.0010, Miles: 6.213,  Mils: 39.37},
                Kilometers: { Centimetres: 1000000, Inches: 39370.07 , Millimetres: 1000000 , Metres: 1000 ,  Feet: 3280.83, Yards: 1093.61 , Miles: 0.62 , Mils: 39370078.74 },
                Feet: { Centimetres: 30.48, Inches: 12, Millimetres: 304.8, Metres: 0.304, Kilometers: 0.0003, Yards: 0.333, Miles: 0.00018, Mils: 12000  },
                Yards: { Centimetres: 91.44, Inches: 36, Millimetres: 914.4, Metres: 0.914, Kilometers: 0.00091, Feet: 3,  Miles: 0.00056, Mils: 36000 },
                Miles: { Centimetres: 160934.4, Inches: 63360, Millimetres: 1609344, Metres: 1609.34, Kilometers: 1.609, Feet: 5280, Yards: 1760,  Mils: 63360000 },
                Mils: { Centimetres: 0.00254, Inches: 0.001, Millimetres: 0.0254, Metres: 0.000025, Kilometers: 2.540, Feet: 0.000083, Yards: 0.000027, Miles: 1.578 },
            },
        },
        Area: {
            units: ["Square Meters", "Square Kilometers", "Acres", "Hectares"],
            conversion: {

            },
        },
        Temparature: {
            units: [],
            conversion: {

            },
        },
        Volume: {
            units: [],
            conversion: {

            },
        },
        Mass: {
            units: [],
            conversion: {

            },
        },
        Data: {
            units: [],
            conversion: {

            },
        },
        Speed: {
            units: [],
            conversion: {

            },
        },
        Time: {
            units: [],
            conversion: {

            },
        },
        Tip: {
            units: [],
            conversion: {

            },
        },

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
            <Keypad handleClick={handleClick} />
        </>
    );
}
export default ScaleConverter;