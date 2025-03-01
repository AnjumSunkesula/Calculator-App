import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDivide, faMinus, faPlus, faXmark, faDeleteLeft, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';

function Keypad ({ handleClick, handleClear, ScaleConverter, handleDelete }) {



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
                    {["7", "8", "9", !ScaleConverter ? <FontAwesomeIcon icon={faDeleteLeft} onClick={handleDelete}/> : <FontAwesomeIcon icon={faXmark}/>].map((item, index) => (
                        <button 
                            key={index} onClick={() => handleClick(item)} 
                            className={React.isValidElement(item) && item.props.icon.iconName === "xmark" ? "operator" : ''} >
                            {item}
                        </button>
                    ))}
                </div>
                <div className='rows'>
                    {/* {["4", "5", "6", <FontAwesomeIcon icon={faMinus}/>].map((item, index) => (
                        <button 
                            key={index} onClick={() => handleClick(item)} 
                            className={React.isValidElement(item) && item.props.icon.iconName === "minus" ? "operator" : ''}>
                            {item}
                        </button>
                    ))} */}
                    {["4", "5", "6"].map((item, index) => (
                        <button key={index} onClick={() => handleClick(item)}>
                            {item}
                        </button>
                    ))}
                    {!ScaleConverter ? (
                        <button className="clear" onClick={handleClear}>C</button>
                    ) : (
                        <button className="operator">
                            <FontAwesomeIcon icon={faMinus} onClick={() => handleClick("-")} />
                        </button>
                    )}
                </div>
                <div className='rows'>
                    {["1", "2", "3", !ScaleConverter ?  <FontAwesomeIcon icon={faArrowUp}/> : <FontAwesomeIcon icon={faPlus}/> ].map((item, index) => (
                        <button 
                            key={index} onClick={() => handleClick(item)} 
                            className={React.isValidElement(item) && item.props.icon.iconName === "plus" ? "operator" : ""}>
                            {item}
                        </button>
                    ))}
                </div>
                <div className='rows'>
                    {["+/-", "0", ".", !ScaleConverter ? <FontAwesomeIcon icon={faArrowDown} /> : "="].map((item, index) => (
                        <button key={index} onClick={() => handleClick(item)} className = {item === "=" ? "equals" : ''} disabled={!ScaleConverter && item === "+/-"}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Keypad;