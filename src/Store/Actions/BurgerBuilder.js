import * as actionType from "./ActionTypes";

import axios from "../../Services/Orders";


export const addIngredients = (name) =>
{
    return {
        type: actionType.ADD_INGREDIENTS,
        ingredientsName: name
    }
}


export const removeIngredients = (name) =>
{
    return {
        type: actionType.REMOVE_INGREDIENTS,
        ingredientsName: name
    }
}

export const setIngredients = (ingredients) =>
{
    return {
        type: actionType.SET_INGREDIENTS,
        Ingredients: ingredients
    }
}


export const fetchIngredients = () => async dispatch =>
{
    const res = await axios.getIgredients(res => res)
    dispatch(setIngredients(res.data))
}
