import './scaleConverter.css';
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Keypad from '../keypad';





function ScaleConverter ({ toggleView, handleClick, display, handleClear, handleDelete }) {

    const [currentCategory, setCurrentCategory] = useState("Length");
    const [fromUnit, setFromUnit] = useState("Inches");
    const [toUnit, setToUnit] = useState("Centimetres");
    const [cursorPosition, setCursorPosition] = useState("from");
    const [activeField, setActiveField] = useState("from");

    const handleArrowKeys = (direction) => {
    if (direction === "up" || direction === "down") {
        const newPosition = cursorPosition === "from" ? "to" : "from";
        setCursorPosition(newPosition);
        setActiveField(newPosition);
    }
};




    // Units and conversion factors
    const categories = {
        Length: {
            units: ["Inches", "Centimetres", "Millimetres", "Metres", "Kilometres", "Feet", "Yards", "Miles", "Mils"],
            conversion: {
                Inches: { Centimetres: 2.54,  Millimetres: 25.4, Metres: 0.0254, Kilometres: 0.000025, Feet: 0.0833, Yards: 0.0278, Miles: 0.000015, Mils: 1000  },
                Centimetres: { Inches: 0.3937, Millimetres: 10, Metres: 0.01, Feet: 0.0328, Yards: 0.0109, Kilometres: 0.00001, Miles: 0.00000062, Mils: 393.7 },
                Metres: { Inches: 39.37, Millimetres: 1000,  Feet: 3.28, Yards: 1.09, Centimetres: 100, Kilometres: 0.001, Miles: 0.0006, Mils: 39370.07 },
                Millimetres : {Inches: 0.0393, Centimetres: 0.1, Metres: 0.001, Kilometres: 0.000001, Feet: 0.0032, Yards: 0.0010, Miles: 6.213,  Mils: 39.37},
                Kilometres: { Centimetres: 1000000, Inches: 39370.07 , Millimetres: 1000000 , Metres: 1000 ,  Feet: 3280.83, Yards: 1093.61 , Miles: 0.62 , Mils: 39370078.74 },
                Feet: { Centimetres: 30.48, Inches: 12, Millimetres: 304.8, Metres: 0.304, Kilometres: 0.0003, Yards: 0.333, Miles: 0.00018, Mils: 12000  },
                Yards: { Centimetres: 91.44, Inches: 36, Millimetres: 914.4, Metres: 0.914, Kilometres: 0.00091, Feet: 3,  Miles: 0.00056, Mils: 36000 },
                Miles: { Centimetres: 160934.4, Inches: 63360, Millimetres: 1609344, Metres: 1609.34, Kilometres: 1.609, Feet: 5280, Yards: 1760,  Mils: 63360000 },
                Mils: { Centimetres: 0.00254, Inches: 0.001, Millimetres: 0.0254, Metres: 0.000025, Kilometres: 2.540, Feet: 0.000083, Yards: 0.000027, Miles: 1.578 },
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
        Temperature: {
            units: ["Fahrenheit", "Celsius" , "Kelvin"],
            conversion: {
                Fahrenheit: { Celsius: -17.2222, Kelvin: 255.92},
                Celsius: { Fahrenheit:33.8, Kelvin: 274.15 },
                Kelvin: { Celsius: -272.15, Fahrenheit: -457.87},
            },
        },
        Volume: {
            units: ["US Gallons","UK Gallons", "Litres", "Millilitres", "Cubic Centimetres", "Cubic Metres", "Cubic Inches", "Cubic Feet"],
            conversion: {
                USGallons : { UKGallons: 0.832,  Litres: 3.785, Millilitres: 3785.411,CubicCentimetres: 3785.411, CubicMetres: 0.0037, CubicInches: 231,CubicFeet: 0.133 },
                UKGallons: { Litres: 4.546, Millilitres: 4546.09,CubicCentimetres: 4546.09, CubicMetres: 0.0045, CubicInches: 277.419,CubicFeet: 0.1605, USGallons: 1.2009},
                Litres: { UKGallons: 0.2199,   Millilitres: 1000,CubicCentimetres: 1000, CubicMetres: 0.001, CubicInches: 61.023 ,CubicFeet: 0.0353, USGallons:0.264},
                Millilitres: { UKGallons: 0.00021,  Litres: 0.001, CubicCentimetres: 1, CubicMetres: 0.000001, CubicInches: 0.0610, CubicFeet: 0.0000353, USGallons: 0.00026},
                CubicCentimetres: { UKGallons: 0.000219,  Litres: 0.001, Millilitres: 1, CubicMetres: 0.000001, CubicInches: 0.0610, CubicFeet: 0.0000353, USGallons: 0.00026},
                CubicMetres: { UKGallons: 219.96,  Litres: 1000, Millilitres: 1000000,CubicCentimetres: 1000000,  CubicInches: 61023.744, CubicFeet: 35.314, USGallons: 264.17},
                CubicInches: { UKGallons: 0.0036,  Litres: 0.016, Millilitres: 16.38, CubicCentimetres: 16.38, CubicMetres: 0.0000163, CubicFeet: 0.00057, USGallons: 0.00432},
                CubicFeet: { UKGallons: 6.22,  Litres: 28.31, Millilitres: 28316.84, CubicCentimetres: 28316.84, CubicMetres: 0.0283, CubicInches: 1728, USGallons: 7.4805},
            },
        },
        Mass: {
            units: ["Tons", "UK Tons", "US Tons", "Pounds", "Ounces", "Kilogrammes", "Grams"],
            conversion: {
                Tons: { UKTons: 0.984, USTons: 1.102, Pounds: 2204.62, Ounces: 35273.96, Kilogrammes: 1000, Grams: 1000000},
                UKTons: { Tons: 1.016,  USTons: 1.12, Pounds: 2240, Ounces: 35840, Kilogrammes: 1016.04, Grams: 1016046.908 },
                USTons: { Tons: 0.907, UKTons: 0.8928,  Pounds: 2000, Ounces: 32000, Kilogrammes: 907.18, Grams: 907184.74 },
                Pounds: { Tons: 0.00045, UKTons: 0.000446, USTons: 0.0005,  Ounces: 16, Kilogrammes: 0.4535, Grams: 453.59 },
                Ounces: { Tons: 0.000028, UKTons: 0.000027, USTons: 0.000031, Pounds: 0.0625,  Kilogrammes: 0.0283, Grams: 28.34 },
                Kilogrammes: { Tons: 0.001, UKTons: 0.00098, USTons: 0.0011, Pounds: 2.204, Ounces: 35.273,  Grams: 1000 },
                Grams: { Tons: 0.00001, UKTons: 9.842, USTons: 0.0000011, Pounds: 0.0022, Ounces: 0.0352, Kilogrammes: 0.001 },
            },
        },
        Data: {
            units: ["Bits", "Bytes", "Kilobytes", "Kibibytes", "Megabytes", "Mebibytes", "Gigabytes", "Gibibytes", "Terabytes", "Tebibytes"],
            conversion: {
                Bits: {  Bytes: 0.125, Kilobytes: 0.000125, Kibibytes: 0.000122, Megabytes: 1.2500, Mebibytes: 1.192, Gigabytes: 1.2500, Gibibytes: 1.1641,Terabytes: 1.2500, Tebibytes: 1.136 },
                Bytes: { Bits: 8,  Kilobytes: 0.001, Kibibytes: 0.00097, Megabytes: 0.000001, Mebibytes: 9.5367, Gigabytes: 1.0000, Gibibytes: 9.313,Terabytes: 1.000, Tebibytes: 9.0949 },
                Kilobytes: { Bits: 8000, Bytes: 1000, Kibibytes: 0.976, Megabytes: 0.001, Mebibytes: 0.00095, Gigabytes: 0.000001, Gibibytes: 9.3132,Terabytes: 1.00, Tebibytes: 9.0949 },
                Kibibytes: { Bits: 8192, Bytes: 1024, Kilobytes: 1.024, Megabytes: 0.00102, Mebibytes: 0.000976, Gigabytes: 0.000001024, Gibibytes: 9.5367,Terabytes: 1.02400, Tebibytes: 9.3132 },
                Megabytes: { Bits: 8000000, Bytes: 1000000, Kilobytes: 1000, Kibibytes: 976.56, Mebibytes: 0.9536, Gigabytes: 0.001, Gibibytes: 0.00093,Terabytes: 0.000001, Tebibytes: 9.094 },
                Mebibytes: { Bits: 8388608, Bytes: 1048576, Kilobytes: 1048.576, Kibibytes: 1024, Megabytes: 1.0485,  Gigabytes: 0.0010, Gibibytes: 0.00097,Terabytes: 0.00000104, Tebibytes: 9.5367 },
                Gigabytes: { Bits: 8000000000, Bytes: 1000000000, Kilobytes: 1000000, Kibibytes: 976562.5, Megabytes: 1000, Mebibytes: 953.67, Gibibytes: 0.931,Terabytes: 0.001, Tebibytes: 0.0009 },
                Gibibytes: { Bits: 8589934592, Bytes: 1073741824, Kilobytes: 1073741.824, Kibibytes: 1048576, Megabytes: 1073.74, Mebibytes: 1024, Gigabytes: 1.073, Terabytes: 0.0010, Tebibytes: 0.000976 },
                Terabytes: { Bits: 8000000000000, Bytes: 1000000000000, Kilobytes: 1000000000, Kibibytes: 976562500, Megabytes: 1000000, Mebibytes: 953674.31, Gigabytes: 1000, Gibibytes: 931.32,Tebibytes: 0.909 },
                Tebibytes: { Bits: 8796093022208, Bytes: 1099511627776, Kilobytes: 1099511627.776, Kibibytes: 1073741824, Megabytes: 1099511.62, Mebibytes: 1048576, Gigabytes: 1099.5116, Gibibytes: 1024,Terabytes: 1.0995 },
            },
        },
        Speed: {
            units: ["Metres Per Second", "Metres Per Hour", "Kilometres Per Second", "Kilometres Per Hour", "Inches Per Second", "Inches Per Hour", "Feet Per Second", "Feet Per Hour", "Miles Per Second", "Miles Per Hour", "Knots"],
            conversion: {
               MetresPerSecond: {  MetresPerHour: 3600, KilometresPerSecond: 0.001, KilometresPerHour: 3.6, InchesPerSecond: 39.370, InchesPerHour: 141732.28, FeetPerSecond: 3.280, FeetPerHour: 11811.023, MilesPerSecond: 0.00062, MilesPerHour: 2.236, Knots: 1.9438 },
               MetresPerHour: { MetresPerSecond: 0.00027,  KilometresPerSecond: 2.777, KilometresPerHour: 0.001, InchesPerSecond: 0.010, InchesPerHour: 39.37, FeetPerSecond: 0.00091, FeetPerHour: 3.280, MilesPerSecond: 1.7260, MilesPerHour: 0.00062, Knots: 0.000539 },
               KilometresPerSecond: { MetresPerSecond: 1000, MetresPerHour: 3600000,  KilometresPerHour: 3600, InchesPerSecond: 39370.07, InchesPerHour: 141732283.46, FeetPerSecond: 3280.83, FeetPerHour: 11811023.622, MilesPerSecond: 0.62137, MilesPerHour: 2236.93, Knots: 1943.844 },
               KilometresPerHour: { MetresPerSecond: 0.277, MetresPerHour: 1000, KilometresPerSecond: 0.0002,  InchesPerSecond: 10.936, InchesPerHour: 39370.07, FeetPerSecond: 0.91134, FeetPerHour: 3280.83, MilesPerSecond: 0.000172, MilesPerHour: 0.62137, Knots: 0.53995 },
               InchesPerSecond: { MetresPerSecond: 0.0254, MetresPerHour: 91.44, KilometresPerSecond: 0.0000254, KilometresPerHour: 0.09144, InchesPerHour: 3600, FeetPerSecond: 0.0833, FeetPerHour: 300, MilesPerSecond: 0.0000157, MilesPerHour: 0.05681, Knots: 0.0493 },
               InchesPerHour: { MetresPerSecond: 0.0000070556, MetresPerHour: 0.0254, KilometresPerSecond: 7.0555, KilometresPerHour: 0.0000254, InchesPerSecond: 0.000277, FeetPerSecond: 0.0000231, FeetPerHour: 0.08333, MilesPerSecond: 4.384, MilesPerHour: 0.0000157, Knots: 0.0000137 },
               FeetPerSecond: { MetresPerSecond: 0.3048, MetresPerHour: 1097.28, KilometresPerSecond: 0.0003048, KilometresPerHour: 1.09728, InchesPerSecond: 12, InchesPerHour: 43200,  FeetPerHour: 3600, MilesPerSecond: 0.000189, MilesPerHour: 0.6818, Knots: 0.5924 },
               FeetPerHour: { MetresPerSecond: 0.00008466, MetresPerHour: 0.3048, KilometresPerSecond: 8.4666, KilometresPerHour: 0.0003048, InchesPerSecond: 0.00333, InchesPerHour: 12, FeetPerSecond: 0.0002277,  MilesPerSecond: 5.26094, MilesPerHour: 0.000189, Knots: 0.000 },
               MilesPerSecond: { MetresPerSecond: 1609.344, MetresPerHour: 5793638.4, KilometresPerSecond: 1.609344, KilometresPerHour: 5793.6384, InchesPerSecond: 63360, InchesPerHour: 228096000, FeetPerSecond: 5280, FeetPerHour: 19008000,  MilesPerHour: 3600, Knots: 3128.3144 },
               MilesPerHour: { MetresPerSecond: 0.44704, MetresPerHour: 1609.344, KilometresPerSecond: 0.00044704, KilometresPerHour: 1.609344, InchesPerSecond: 17.6, InchesPerHour: 63360, FeetPerSecond: 1.4666, FeetPerHour: 5280, MilesPerSecond: 0.000277,  Knots: 0.86897 },
               Knots: { MetresPerSecond: 0.5144, MetresPerHour: 1852, KilometresPerSecond: 0.0005144, KilometresPerHour: 1.852, InchesPerSecond: 20.25371, InchesPerHour: 72913.3858, FeetPerSecond: 1.687809, FeetPerHour: 6076.115, MilesPerSecond: 0.000319661, MilesPerHour: 1.15077 },
            },
        },
        Time: {
            units: ["Milliseconds","Seconds", "Minutes", "Hours", "Days", "Weeks"],
            conversion: {
                Milliseconds: {  Seconds: 0.001, Minutes: 0.000016667, Hours: 2.777, Days: 1.15740, Weeks: 1.653439  },     
                Seconds: { Milliseconds: 1000,  Minutes: 0.0166666667, Hours: 0.002777778, Days: 0.0000115741, Weeks: 0.0000016534 },
                Minutes: { Milliseconds: 60000, Seconds: 60,  Hours: 0.0166, Days: 0.0006944, Weeks: 0.0000992063 },
                Hours: { Milliseconds: 3600000, Seconds: 3600, Minutes: 60,  Days: 0.041, Weeks: 0.0059 },
                Days: { Milliseconds: 86400000, Seconds: 86400, Minutes: 1440, Hours: 24,  Weeks: 0.1428571429 },
                Weeks: { Milliseconds: 604800000, Seconds: 604800, Minutes: 10080, Hours: 168, Days: 7},
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
                        
                        <span className={"ip-value"}>   {/* if the display is empty, it falls back to the value of "1" */}
                            {display || "1"} 
                            {activeField === 'from' && <span className='cursor'></span>} {fromUnit.slice(0, 2).toLowerCase()}
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
                       
                        <span className="op-value">
                            {performConversion(display || "1")}
                            {activeField === 'to' && <span className='cursor'></span>} {toUnit.slice(0, 2).toLowerCase()}
                        </span>
                    </div>
                </div>
            </div>

            <Keypad handleClick={handleClick} handleClear={handleClear} handleDelete={handleDelete} handleArrowKeys={handleArrowKeys}/>
        </>
    );
}
export default ScaleConverter;