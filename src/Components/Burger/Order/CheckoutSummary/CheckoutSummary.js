import React from 'react';

import Burger from '../../Burger'

import classes from './CheckoutSummary.module.css'
import Button from "../../../UI/Button/Button";


const CheckoutSummary = (props) =>
{
    return (
        <div className={classes.CheckoutSummary}>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger Ingredients={props.Ingredients} />
            </div>
            <Button type="Danger" clicked={props.CheckoutCancel}>Cancel</Button>
            <Button type="Success" clicked={props.CheckoutContinue}>Continue</Button>
        </div>
    )
}


export default CheckoutSummary;