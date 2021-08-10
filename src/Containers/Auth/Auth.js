import React, { Component } from 'react';

import { Redirect } from "react-router-dom";

import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";

import * as action from "../../Store/Actions/index";

import { connect } from "react-redux";

import classes from './Auth.module.css'
import Spinner from '../../Components/UI/Spinner/Spinner';

class Auth extends Component
{
    state = {
        controls: {
            Email: {
                elementtype: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: false,
                value: ''
            },
            Password: {
                elementtype: 'input',
                elementConfig: {
                    type: 'Password',
                    placeholder: 'Enter password'
                },
                validation: {
                    required: true,
                },
                isValid: true,
                touched: false,
                value: ''
            },
        },
        isSignUp: true
    }
    changehandler = (event, identifier) =>
    {
        const updatedOrderForm = {
            ...this.state.controls
        }
        const udpatedElement = { ...updatedOrderForm[identifier] }
        udpatedElement.value = event.target.value
        udpatedElement.isValid = this.checkValidity(udpatedElement.value, udpatedElement['validation'])
        udpatedElement.touched = true
        updatedOrderForm[identifier] = udpatedElement
        this.setState({ controls: updatedOrderForm })
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
    handleAuth = (event) =>
    {
        event.preventDefault()
        this.props.onAuthenticate(this.state.controls.Email.value, this.state.controls.Password.value, this.state.isSignUp)
    }
    changeAuthHandler = () =>
    {
        this.setState((preState) =>
        {
            return {
                isSignUp: !preState.isSignUp
            }
        })
    }

    componentDidMount()
    {
        if (!this.props.building && this.props.redirectPath !== '/')
        {
            this.props.onSetRedirect()
        }
    }
    render()
    {
        let formElement = [];
        for (let key in this.state.controls)
        {
            formElement.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = null
        if (this.props.loading)
        {
            form = <Spinner />
        } else
        {
            form = (
                <>
                    <h4>Enter Your Crenditals</h4>
                    <form onSubmit={this.handleAuth}>
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
                        <Button type="Success">Submit</Button>
                    </form>
                    <Button type="Danger" clicked={this.changeAuthHandler}>Switch To {this.state.isSignUp ? 'SignUp' : 'SignIn'}</Button>
                </>
            )
        }
        let error = null;
        if (this.props.error)
        {
            error = <p className={classes.error}>{this.props.error.message}</p>
        }
        let auth = null
        if (this.props.isAuthenticated)
        {
            auth = <Redirect to={this.props.redirectPath} />
        }
        return (
            <div className={classes.Contols}>
                {auth}
                {error}
                {form}
            </div>
        );
    }
}


const mapStateToProps = (state) =>
{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        redirectPath: state.auth.authRedirectPath,
        building: state.burgerBuilder.building
    }
}
const mapDispatchToProps = (dispatch) =>
{
    return {
        onAuthenticate: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp)),
        onSetRedirect: () => dispatch(action.authSetRedirect('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);