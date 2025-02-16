import './scaleConverter.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Keypad from '../keypad';





function ScaleConverter ({ toggleView, handleClick, display }) {

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
            units: ["Ares", "Square Metres", "Square Centimetres", "Acres", "Hectares", "Square Feet", "Square Inches"],
            conversion: {
                Ares: { SquareMetres: 100, SquareCentimetres: 1000000, Acres: 0.024, Hectares: 0.01, SquareFeet: 1076.39, SquareInches: 155000.31},
                SquareMetres: { Ares: 0.01, SquareCentimetres: 10000, Acres: 0.00024, Hectares: 10000, SquareFeet: 10.76, SquareInches: 1550.003 },
                SquareCentimetres: { Ares: 0.000001, SquareMetres: 0.0001, Acres: 2.471, Hectares: 1.00, SquareFeet: 0.0010, SquareInches: 0.155 },
                Acres: { Ares: 40.4, SquareMetres: 4046.85, SquareCentimetres: 40468564.224, Hectares: 0.404, SquareFeet: 43560, SquareInches: 6272640 },
                Hectares: { Ares: 100, SquareMetres: 10000, SquareCentimetres: 100000000, Acres: 2.47, SquareFeet: 107639.10, SquareInches: 15500031 },
                SquareFeet: { Ares: 0.00092, SquareMetres: 0.092, SquareCentimetres: 929.03, Acres: 0.000022, Hectares: 0.0000092, SquareInches: 144 },
                SquareInches: { Ares: 0.0000064, SquareMetres: 0.00064, SquareCentimetres: 6.4516, Acres: 1.594, Hectares: 6.451, SquareFeet: 0.006 }, 
            },
        },
        Temparature: {
            units: ["Fahrenheit", "Celsius" , "Kelvin"],
            conversion: {
                Fahrenheit: { Celsius: -17.2222, Kelvin: 255.92},
                Celsius: {Farenheit:33.8, Kelvin: 274.15 },
                Kelvin: {Celsius: -272.15, Farenheit: -457.87},
            },
        },
        Volume: {
            units: ["US Gallons","UK Gallons", "Litres", "Millilitres", "Cubic Centimetres", "Cubic Metres", "Cubic Inches", "Cubic Feet"],
            conversion: {
                USGallons : { UKGallons: 0.832,  Litres: 3.785, Millilitres: 3785.411,CubicCentimetres: 3785.411, CubicMetres: 0.0037, CubicInches: 231,CubicFeet: 0.133 },
                UKGallons: { Litres: 4.546, Millilitres: 4546.09,CubicCentimetres: 4546.09, CubicMetres: 0.0045, CubicInches: 277.419,CubicFeet: 0.1605, USGallons: 1.2009},
                Litres: {UKGallons: 0.2199,   Millilitres: 1000,CubicCentimetres: 1000, CubicMetres: 0.001, CubicInches: 61.023 ,CubicFeet: 0.0353, USGallons:0.264},
                Millilitres: {UKGallons: 0.00021,  Litres: 0.001, CubicCentimetres: 1, CubicMetres: 0.000001, CubicInches: 0.0610, CubicFeet: 0.0000353, USGallons: 0.00026},
                CubicCentimetres: {UKGallons: 0.000219,  Litres: 0.001, Millilitres: 1, CubicMetres: 0.000001, CubicInches: 0.0610, CubicFeet: 0.0000353, USGallons: 0.00026},
                CubicMetres: {UKGallons: 219.96,  Litres: 1000, Millilitres: 1000000,CubicCentimetres: 1000000,  CubicInches: 61023.744, CubicFeet: 35.314, USGallons: 264.17},
                CubicInches: {UKGallons: 0.0036,  Litres: 0.016, Millilitres: 16.38, CubicCentimetres: 16.38, CubicMetres: 0.0000163, CubicFeet: 0.00057, USGallons: 0.00432},
                CubicFeet: {UKGallons: 6.22,  Litres: 28.31, Millilitres: 28316.84, CubicCentimetres: 28316.84, CubicMetres: 0.0283, CubicInches: 1728, USGallons: 7.4805},
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

    // Perform the conversion
    const performConversion = (value) => {
        const numValue = parseFloat(value) || 0;

        // Remove spaces from the unit names for internal use in conversion
        const fromUnitKey = fromUnit.replace(/\s+/g, '');
        const toUnitKey = toUnit.replace(/\s+/g, '');                               // Remove all spaces

        const conversionFactor = categories[currentCategory].conversion[fromUnitKey][toUnitKey];
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
                        {/* if the display is empty, it falls back to the value of "1" */}
                        <span className='ip-value'>
                            {display || "1"} {fromUnit.slice(0, 2).toLowerCase()}               
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
                        <span className='op-value'>
                            {performConversion(display || "1")} {toUnit.slice(0, 2).toLowerCase()}
                        </span>
                    </div>
                </div>

            </div>
            <Keypad handleClick={handleClick} />
        </>
    );
}
export default ScaleConverter;