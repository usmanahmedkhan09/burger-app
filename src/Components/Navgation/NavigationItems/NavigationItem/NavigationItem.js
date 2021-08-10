import React from 'react'

import classes from './NavigationItem.module.css'
import { NavLink } from "react-router-dom";


const NavigationItem = (props) =>
{
    return (
        // <div >
        <li className={classes.NavigationItem}>

            <NavLink
                exact={props.exact}
                to={props.link}
                activeClassName={classes.active} >{props.children}</NavLink>

        </li>
        // </div>
    )
}

export default NavigationItem