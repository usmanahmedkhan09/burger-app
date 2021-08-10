import Aux from '../../Hoc/Auxilary'

import { connect } from "react-redux";

import classes from "./Layout.module.css";

import Toolbar from "../../Components/Navgation/Toolbar/Toolbar";

import SideDrawer from "../Navgation/SideDrawer/Sidedrawer";
import { Component } from 'react';

class Layout extends Component
{
    state = {
        closeDrawerHandler: false
    }

    CloseDrawerHandler = (props) =>
    {
        this.setState({ closeDrawerHandler: false })
    }

    drawertogglerHandler = (props) =>
    {
        this.setState((preState) =>
        {
            return { closeDrawerHandler: !preState.closeDrawerHandler }
        })
    }
    render()
    {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerTogglerClicked={this.drawertogglerHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.closeDrawerHandler} closed={this.CloseDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }


}

const mapStateToProps = (state) =>
{
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)