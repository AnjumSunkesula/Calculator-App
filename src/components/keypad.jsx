import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDivide, faMinus, faPlus, faXmark, faDeleteLeft} from '@fortawesome/free-solid-svg-icons';

function Keypad ({ handleClick, handleClear, ScaleConverter }) {

    return(
        <>
            <div className='button-wrapper'>
                <div className='rows'>
                    {ScaleConverter && <button className='clear' onClick={handleClear}>C</button>}
                    {ScaleConverter && <button className='operator' onClick={() => handleClick("()")}>( )</button>}
                    {ScaleConverter && <button className='operator' onClick={() => handleClick("%")}>%</button>}
                    {ScaleConverter && <button className='operator' onClick={() => handleClick("/")}><FontAwesomeIcon icon={faDivide}/></button>}
                </div>
                <div className='rows'>
                    {["7", "8", "9", ScaleConverter ? <FontAwesomeIcon icon={faDeleteLeft}/> : <FontAwesomeIcon icon={faXmark}/>].map((item, index) => (
                        <button 
                            key={index} onClick={() => handleClick(item)} 
                            className={React.isValidElement(item) && item.props.icon.iconName === "xmark" ? "operator" : ''} >
                            {item}
                        </button>
                    ))}
                </div>
                <div className='rows'>
                    {["4", "5", "6", <FontAwesomeIcon icon={faMinus}/>].map((item, index) => (
                        <button 
                            key={index} onClick={() => handleClick(item)} 
                            className={React.isValidElement(item) && item.props.icon.iconName === "minus" ? "operator" : ''}>
                            {item}
                        </button>
                    ))}
                </div>
                <div className='rows'>
                    {["1", "2", "3", <FontAwesomeIcon icon={faPlus}/>].map((item, index) => (
                        <button 
                            key={index} onClick={() => handleClick(item)} 
                            className={React.isValidElement(item) && item.props.icon.iconName === "plus" ? "operator" : ""}>
                            {item}
                        </button>
                    ))}
                </div>
                <div className='rows'>
                    {["+/-", "0", ".", "="].map((item, index) => (
                        <button key={index} onClick={() => handleClick(item)} className = {item === "=" ? "equals" : ''}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Keypad;