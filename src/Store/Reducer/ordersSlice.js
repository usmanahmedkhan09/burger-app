import * as actionType from '../Actions/ActionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}
export const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case actionType.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionType.SET_ORDERS:
            return {
                ...state,
                orders: [...action.orders],
                loading: false
            }
        case actionType.PURCHASE_INIT:
            return {
                ...state,
                purchased: false

            }
        case actionType.PURCHASE_BURGER_SUCCESS:
            let newOrder = {
                ...action.orderData,
                id: action.orderID
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                purchased: true,
                loading: false,
            }
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionType.HANDLE_LOADER:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }

}

export default reducer