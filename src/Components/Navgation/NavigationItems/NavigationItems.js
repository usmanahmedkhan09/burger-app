
import classes from './NavigationItems.module.css'

import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";


const NavigationItems = (props) =>
{
    return (
        // <div >
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {!props.isAuthenticated ? <NavigationItem link="/Auth">Authenticate</NavigationItem> : <NavigationItem link="/Logout">Logout</NavigationItem>}
        </ul>
        // </div>
    )
}

export default NavigationItems