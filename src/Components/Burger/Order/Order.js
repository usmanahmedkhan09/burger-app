import React from 'react';

import classes from './Order.module.css'

const Order = (props) =>
{
    let Ingredients = [];
    for (let ingredient in props.ingredients)
    {
        Ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        })
    }

    let IngredientsDetails = Ingredients.map(item =>
    {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} key={item.name}>{item.name}, ({item.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <div>Ingredients : {IngredientsDetails}</div>
            <div>Price <strong>USD : {props.price}</strong></div>
        </div>
    )
}

export default Order;