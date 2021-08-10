import React from 'react';

import classes from './Input.module.css'

const Input = (props) =>
{
    let inputElement = null;
    const InputClasses = [classes.InputElement]
    if (props.inValid && props.shouldValidate && props.touched)
    {
        InputClasses.push(classes.Invalid)
    }
    switch (props.elementType)
    {
        case ('input'):
            inputElement = <input onChange={props.changed} className={InputClasses.join(' ')}  {...props.elementConfig} value={props.value} />
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.changed} className={InputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case ('select'):
            inputElement = (
                <select onChange={props.changed} className={InputClasses.join(' ')} value={props.value}>
                    {props.elementConfig.options.map(item =>
                    {
                        return <option key={item.value} value={item.value}>{item.displayValue}</option>
                    })}
                </select>
            )
            break;
        default:
            inputElement = <input className={InputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>

    );
};

export default Input;