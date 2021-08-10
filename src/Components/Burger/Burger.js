import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from './BurgerIngredients/Burgeringerdients'

const burger = (props) =>
{
    let transfromingredients = Object.keys(props.Ingredients).map(key =>
    {
        return [...Array(props.Ingredients[key])].map((a, i) =>
        {
            return <BurgerIngredient type={key} key={key + i} />
        })
    })
        .reduce((arr, el) =>
        {
            return arr.concat(el)
        }, []);
    if (transfromingredients.length < 1)
    {
        transfromingredients = <div>Please add Ingredients</div>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfromingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;