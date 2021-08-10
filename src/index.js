import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import BurgerbuilderSlice from "./Store/Reducer/BurgerbuilderSlice";
import OrdersSlice from './Store/Reducer/ordersSlice'
import authReducer from "./Store/Reducer/authSlice";




const rootReducer = combineReducers({
  burgerBuilder: BurgerbuilderSlice,
  Orders: OrdersSlice,
  auth: authReducer
})

const composedEnhancer = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunkMiddleware)) : applyMiddleware(thunkMiddleware)

const store = createStore(rootReducer, composedEnhancer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
