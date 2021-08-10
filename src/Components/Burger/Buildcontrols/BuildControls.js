import React from 'react';

import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'
const controls = [
    { Label: 'Salad', type: 'salad' },
    { Label: 'Bacon', type: 'bacon' },
    { Label: 'Meat', type: 'meat' },
    { Label: 'Cheese', type: 'cheese' }
];


const BuildControls = (props) =>
{
    return (
        <div className={classes.BuildControls}>
            <p><strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map(crtl =>
            {
                return <BuildControl
                    key={crtl.Label}
                    Label={crtl.Label}
                    added={() => props.addIngredients(crtl.type)}
                    removed={() => props.removeIngredients(crtl.type)}
                    disabled={props.disbaledInfo[crtl.type]} />
            })}
            <button disabled={!props.purchaseable} className={classes.OrderButton} onClick={props.clicked}>
                {props.isAuth ? 'Order Now' : 'signUp For Order'}</button>
        </div>
    )
}

export default BuildControls