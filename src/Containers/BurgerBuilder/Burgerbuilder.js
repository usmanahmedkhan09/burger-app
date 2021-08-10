import React, { Component } from 'react';

import { connect } from "react-redux";

import Aux from "../../Hoc/Auxilary";

import Burger from "../../Components/Burger/Burger"

import BurgerControls from "../../Components/Burger/Buildcontrols/BuildControls"

import Modal from "../../Components/UI/Modal/Modal";

import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

// import Orders from '../../Services/Orders'

import Spinner from '../../Components/UI/Spinner/Spinner'

import withErrorHandler from "../../Hoc/withErrorhandler/withErrorHandler";

import axios from 'axios';

import * as action from '../../Store/Actions/index'






class BurgerBuilder extends Component
{
    state = {
        loading: false,
        purchasing: false
    }


    componentDidMount()
    {
        this.props.onInitIngredients()
    }


    updatepurchaseable = (ingredients) =>
    {
        let sum = Object.keys(ingredients)
            .map((item) =>
            {
                return ingredients[item]
            })
            .reduce((acc, cur) =>
            {
                return acc + cur;
            }, 0)
        return sum > 0

    }
    purchaseableHandler = () =>
    {
        if (this.props.isAuthenticated)
        {
            this.props.PurchaseInit()
            this.setState({ purchasing: true })
        } else
        {
            this.props.onSetAuthRedirect('/Checkout')
            this.props.history.push("/Auth")
        }

    }

    cancelpurchasHandler = () =>
    {
        this.setState({ purchasing: false })
    }

    BuyBurgerHandler = () =>
    {
        this.props.history.push('/checkout')
    }

    render()
    {
        let disbaledInfo = {
            ...this.props.Ingredients
        }
        for (let key in disbaledInfo)
        {
            disbaledInfo[key] = disbaledInfo[key] <= 0
        }
        let burger = null;
        let burgerSummary = null
        if (this.props.Ing)
        {
            burger = (
                <Aux>
                    <Burger Ingredients={this.props.Ing} />
                    <BurgerControls
                        price={this.props.totalPrice}
                        addIngredients={this.props.onaddIngredients}
                        removeIngredients={this.props.onremoveIngredients}
                        disbaledInfo={disbaledInfo}
                        clicked={this.purchaseableHandler}
                        isAuth={this.props.isAuthenticated}
                        purchaseable={this.updatepurchaseable(this.props.Ing)} />
                </Aux>
            )
            burgerSummary = (
                <OrderSummary
                    buy={this.BuyBurgerHandler}
                    closeModal={this.cancelpurchasHandler}
                    price={this.props.totalPrice.toFixed(2)}
                    Ingredients={this.props.Ing} />
            )
        }
        if (this.state.loading)
        {
            burgerSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.cancelpurchasHandler}>
                    {burgerSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>
{
    return {
        Ing: state.burgerBuilder.Ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch =>
{
    return {
        onaddIngredients: (value) => dispatch(action.addIngredients(value)),
        onremoveIngredients: (value) => dispatch(action.removeIngredients(value)),
        onInitIngredients: () => dispatch(action.fetchIngredients()),
        PurchaseInit: () => dispatch(action.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(action.authSetRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));