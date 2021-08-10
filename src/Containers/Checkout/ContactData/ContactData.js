import React, { Component } from 'react';

import { connect } from "react-redux";

import Button from '../../../Components/UI/Button/Button'

import classes from './ContactData.module.css'

import Spinner from '../../../Components/UI/Spinner/Spinner'

import Input from "../../../Components/UI/Input/Input";

import * as OrderActions from "../../../Store/Actions/index";

class ContactData extends Component
{
    state = {
        orderForm: {
            name: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: false,
                value: ''
            },
            email: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: false,
                value: ''
            },
            street: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: false,
                value: ''
            },
            zip: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: true,
                touched: false,
                value: ''
            },
            country: {
                elementtype: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: false,
                value: ''
            },
            deliveryMethod: {
                elementtype: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                value: '',
                isValid: true,
            }
        },
        validForm: false

    }

    saveOrder = (event) =>
    {
        event.preventDefault()
        let formData = {}
        for (let key in this.state.orderForm)
        {
            formData[key] = this.state.orderForm[key].value
        }
        let Order = {
            Ingredients: this.props.Ingredients,
            Customer: formData,
            Price: this.props.totalPrice.toFixed(2),
            userId: this.props.userId
        }
        this.props.addOrders(Order, this.props.token)
    }

    checkValidity = (value, Rules) =>
    {
        let isValid = true;

        if (Rules.required)
        {
            isValid = value.trim() !== '' && isValid
        }

        if (Rules.minLength)
        {
            isValid = value.length >= Rules.minLength && isValid
        }

        if (Rules.maxLength)
        {
            isValid = value.length <= Rules.maxLength && isValid
        }

        return isValid
    }


    changehandler = (event, identifier) =>
    {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const udpatedElement = { ...updatedOrderForm[identifier] }
        udpatedElement.value = event.target.value
        udpatedElement.isValid = this.checkValidity(udpatedElement.value, udpatedElement['validation'])
        udpatedElement.touched = true
        updatedOrderForm[identifier] = udpatedElement
        let fromValidity = true
        for (let key in updatedOrderForm)
        {
            fromValidity = updatedOrderForm[key].isValid && fromValidity
        }
        this.setState({ orderForm: updatedOrderForm, validForm: fromValidity })
    }
    render()
    {
        let formElement = [];
        for (let key in this.state.orderForm)
        {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <>
                <h4>Enter Your Contact Data</h4>
                <form onSubmit={this.saveOrder}>
                    {formElement.map(element =>
                    {
                        return <Input
                            key={element.id}
                            changed={(event) => this.changehandler(event, element.id)}
                            elementType={element.config.elementtype}
                            inValid={!element.config.isValid}
                            shouldValidate={element.config.validation}
                            touched={element.config.touched}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value} />
                    })}
                    <Button type="Success" disabled={!this.state.validForm}>Order</Button>
                </form>
            </>
        )
        if (this.props.loading)
        {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    return {
        Ingredients: state.burgerBuilder.Ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.Orders.loading,
        userId: state.auth.userId,
        token: state.auth.token
    }

}

const mapDispatchToProps = dispatch =>
{
    return {
        addOrders: (data, payload) => dispatch(OrderActions.addOrder(data, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);