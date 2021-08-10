import * as actionType from "../Actions/ActionTypes";

const initialState = {
    Ingredients: null,
    totalPrice: 0,
}

const IngredientsPrice = {
    salad: 0.7,
    meat: 1.6,
    cheese: 0.9,
    bacon: 0.4,
    building: false
}
const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case actionType.ADD_INGREDIENTS:
            return {
                ...state,
                Ingredients: {
                    ...state.Ingredients,
                    [action.ingredientsName]: state.Ingredients[action.ingredientsName] + 1
                },
                totalPrice: state.totalPrice + IngredientsPrice[action.ingredientsName],
                building: true
            };
        case actionType.REMOVE_INGREDIENTS:
            return {
                ...state,
                Ingredients: {
                    ...state.Ingredients,
                    [action.ingredientsName]: state.Ingredients[action.ingredientsName] - 1
                },
                totalPrice: state.totalPrice - IngredientsPrice[action.ingredientsName],
                building: true
            };
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                Ingredients: action.Ingredients,
                totalPrice: 0,
                building: false
            }
        default:
            return state
    }
}

export default reducer