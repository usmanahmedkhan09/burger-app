import React, { Component } from 'react';

import Order from "../../Components/Burger/Order/Order";

import withErrorHandler from "../../Hoc/withErrorhandler/withErrorHandler";

import Spinner from "../../Components/UI/Spinner/Spinner";

import { connect } from "react-redux";

import * as actions from "../../Store/Actions/index";

import axios from '../../Services/Common';

class Orders extends Component
{


    componentDidMount()
    {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render()
    {
        let Orders = <Spinner />
        if (!this.props.loading)
        {
            Orders = (
                <div>
                    {this.props.orders.map(order =>
                    {
                        return <Order
                            key={order.id}
                            ingredients={order.Ingredients}
                            price={order.Price} />
                    })}
                </div>
            )
        }
        return Orders
    }
}


const mapStateToProps = state =>
{
    return {
        orders: state.Orders.orders,
        loading: state.Orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>
{
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));