import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // Changed to class for testing purposes

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following toppings:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Complete Check Out?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxiliary>
        );

    }
}

export default OrderSummary;