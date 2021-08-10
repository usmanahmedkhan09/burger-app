import React from "react";

import Aux from '../../../Hoc/Auxilary'

import Button from "../../UI/Button/Button";

const OrderSummary = (props) =>
{
    const IngredientsSummary = Object.keys(props.Ingredients)
        .map(igKey =>
        {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.Ingredients[igKey]}</li>
        })
    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {IngredientsSummary}
            </ul>
            <p><strong>Total Price : {props.price} $</strong></p>
            <p>....Continue to checkout?</p>
            <Button type='Danger' clicked={props.closeModal}>Cancel</Button>
            <Button type="Success" clicked={props.buy}>Continue</Button>
        </Aux>
    )
}

function areEqual(preprops, nextProps)
{
    return !(+preprops.price !== +nextProps.price)
}
export default React.memo(OrderSummary, areEqual)
// export default OrderSummary