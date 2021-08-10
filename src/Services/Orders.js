import axios from './Common'

const Order = {
    Create: function (data, payload)
    {
        return axios.post('/Orders.json?auth=' + payload, data)
            .then(response =>
            {
                return response
            }).catch(error =>
            {
                return error
            })
    },

    getIgredients: function ()
    {
        return axios.get('ingredients.json')
            .then(response =>
            {
                return response
            })
    },

    getOrders: function (params)
    {
        return axios.get('/Orders.json' + params)
            .then(response =>
            {
                return response
            }).catch(error =>
            {
                return error
            })
    }
}
export default Order