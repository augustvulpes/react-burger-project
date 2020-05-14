import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Burger from '../../components/Bg/Bg';
import BuildControls from '../../components/Bg/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Bg/OS/OS';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

export class BgBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            const currentStatus = this.state.purchasing;
            this.setState({purchasing: !currentStatus});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        };
        let orderSummary = null;
        let burger = this.props.error ? <h3>Data can't be loaded!</h3> : <Spinner />;
        if (this.props.ings) {
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)} />;
            
            burger = (
                <>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                 price={this.props.price}
                 purchasable={this.updatePurchaseState(this.props.ings)}
                 ingredientAdded={this.props.onIngredientAdded}
                 ingredientRemoved={this.props.onIngredientRemoved}
                 disabled={disabledInfo}
                 isAuth={this.props.isAuthenticated}
                 ordered={this.purchaseHandler} />
                </>
            );
        };

        return (
            <>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
            </>
        );
    }
};


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BgBuilder, axios));