import Layout from "../src/Components/Layout/Layout";
import React, { Suspense } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/Burgerbuilder";
import Logout from "./Containers/Auth/Logout/Logout";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "./Store/Actions/index";
import { useEffect } from "react";

const checkout = React.lazy(() => import('../src/Containers/Checkout/Checkout'));
const orders = React.lazy(() => import('./Containers/Orders/Orders'));
const auth = React.lazy(() => import('./Containers/Auth/Auth'));




function App(props)
{
  useEffect(() =>
  {
    props.onCheckAuthState()
  })
  let routes = (
    <Switch>
      <Route path="/Auth" component={auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>

  )
  if (props.onAuthenticated)
  {
    routes = (
      <Switch>
        <Route path="/checkout" component={checkout} />
        <Route path="/orders" component={orders} />
        <Route path="/Logout" component={Logout} />
        <Route path="/Auth" component={auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Layout>
          {routes}
        </Layout>
      </div >
    </Suspense>
  );
}

const mapStateToProps = state =>
{
  return {
    onAuthenticated: state.auth.token != null
  }
}
const mapDispatchToProps = dispatch =>
{
  return {
    onCheckAuthState: () => dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
