import * as ActionTypes from "../Actions/ActionTypes";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}


const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case ActionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idtoken,
                userId: action.userId,
                loading: false
            }
        case ActionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case ActionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId: null,
                token: null
            }
        case ActionTypes.AUTH_PATH_REDIRECT:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state
    }
}

export default reducer