import React, { Component } from 'react';

import CheckoutSummary from "../../Components/Burger/Order/CheckoutSummary/CheckoutSummary";

import ContactData from "../Checkout/ContactData/ContactData";

import { Route, Redirect } from 'react-router-dom'

import { connect } from "react-redux";

class Checkout extends Component
{


    CancelCheckout = () =>
    {
        this.props.history.goBack()
    }

    ContinueCheckout = () =>
    {

        this.props.history.replace('/checkout/contact-data')
    }

    // componentDidMount()
    // {
    //     let query = new URLSearchParams(this.props.location.search)
    //     let Ingredients = {}
    //     let price = {}
    //     for (let param of query.entries())
    //     {
    //         if (param[0] === 'price')
    //         {
    //             price = +param[1]
    //         } else
    //         {
    //             Ingredients[param[0]] = +param[1]
    //         }

    //     }
    //     this.setState({ Ingredients: Ingredients, totalPrice: price })
    // }
    render()
    {
        let summary = null
        let purchase = null
        if (this.props.Ing)
        {
            purchase = this.props.purchased ? <Redirect to="/" /> : null
            summary = (<>
                {purchase}
                <CheckoutSummary
                    Ingredients={this.props.Ing}
                    CheckoutCancel={this.CancelCheckout}
                    CheckoutContinue={this.ContinueCheckout} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </>)
        }
        else
        {
            summary = (<Redirect to="/" />)
        }

        return summary
    }
}

const mapStateToProps = state =>
{
    return {
        Ing: state.burgerBuilder.Ingredients,
        purchased: state.Orders.purchased
    }

}
export default connect(mapStateToProps)(Checkout);