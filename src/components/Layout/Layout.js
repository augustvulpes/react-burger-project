import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  
  sideDrawerHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  };
  
  render () {
    return (
      <>
      <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerHandler} />
      <SideDrawer
        open={this.state.showSideDrawer}
        isAuth={this.props.isAuthenticated} 
        closed={this.sideDrawerHandler} />
      <main className={classes.Content}>
          {this.props.children}
      </main>
      </>
      );
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);