import React from 'react';

import classes from './SideDrawer.module.css';

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    };
    
    return (
        <>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}> 
            <Logo />
            </div>
            <nav onClick={props.closed}>
            <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </div>
        </>
    );
};

export default sideDrawer;