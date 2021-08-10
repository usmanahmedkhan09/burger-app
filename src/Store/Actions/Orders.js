import axios from "../../Services/Orders";
import * as actionType from './ActionTypes'


export const purchaseBurggerSuccess = (id, orderData) =>
{
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

export const purchaseBurggerFail = (error) =>
{
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseInit = () =>
{
    return {
        type: actionType.PURCHASE_INIT
    }
}
export const handleLoader = () =>
{
    return {
        type: actionType.HANDLE_LOADER,
    }
}

export const fetchOrderStart = () =>
{
    return {
        type: actionType.FETCH_ORDER_START
    }
}

export const addOrder = (data, payload) =>
{
    return dispatch =>
    {
        dispatch(handleLoader())
        axios.Create(data, payload).then((res) =>
        {
            dispatch(purchaseBurggerSuccess(res.data.name, payload))
        })
    }
}


export const SetOrders = (payload) =>
{
    return {
        type: actionType.SET_ORDERS,
        orders: payload
    }
}


export const fetchOrders = (token, userId) => dispatch =>
{
    dispatch(fetchOrderStart())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios.getOrders(queryParams).then(res =>
    {
        let fetchedOrders = [];
        for (let key in res.data)
        {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            })
        }
        dispatch(SetOrders(fetchedOrders))
    }).catch(error => error)

}