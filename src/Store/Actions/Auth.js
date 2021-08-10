import * as ActionTypes from "./ActionTypes";

import axios from "axios";

export const authStart = () =>
{
    return {
        type: ActionTypes.AUTH_START
    }
}

export const authSuccess = (idtoken, userId) =>
{
    return {
        type: ActionTypes.AUTH_SUCCESS,
        idtoken: idtoken,
        userId: userId
    }
}

export const authFail = (error) =>
{
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () =>
{
    localStorage.removeItem('token')
    localStorage.removeItem('expire')
    localStorage.removeItem('userId')
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export const authTimeExpiretion = (time) =>
{
    return (dispatch) =>
    {
        setTimeout(() =>
        {
            dispatch(logOut())
        }, time * 1000)
    }
}

export const authSetRedirect = (path) =>
{
    return {
        type: ActionTypes.AUTH_PATH_REDIRECT,
        path: path
    }
}

export const auth = (email, password, isSignUp) =>
{
    return (dispatch) =>
    {
        dispatch(authStart())
        let data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDq05F-7DKeoLzoWhj6aVwUb5diA0TH8FQ';
        if (!isSignUp)
        {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDq05F-7DKeoLzoWhj6aVwUb5diA0TH8FQ'
        }
        axios.post(url, data)
            .then(Response =>
            {
                const expireTime = new Date(new Date().getTime() + Response.data.expiresIn * 1000)
                window.localStorage.setItem('expire', expireTime)
                window.localStorage.setItem('token', Response.data.idToken)
                window.localStorage.setItem('userId', Response.data.localId)
                dispatch(authSuccess(Response.data.idToken, Response.data.localId))
                dispatch(authTimeExpiretion(Response.data.expiresIn))
            })
            .catch(error => dispatch(authFail(error.response.data.error)))
    }
}


export const authCheckState = () =>
{
    return dispatch =>
    {
        const token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        if (!token)
        {
            dispatch(logOut)
        } else
        {
            let expirationTime = new Date(localStorage.getItem('expire'))
            if (expirationTime < new Date())
            {
                dispatch(logOut())
            } else
            {
                dispatch(authSuccess(token, userId))
                dispatch(authTimeExpiretion((expirationTime.getTime() - new Date().getTime()) / 1000))
            }

        }
    }
}