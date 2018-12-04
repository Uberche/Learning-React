import React, { Component } from 'react';

import Order from '../../containers/Orders/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log(fetchedOrders);
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            })

    }

    render() {
        // let orders = (<div>None</div>);
        // for (let order in this.state.orders) {
        //     console.log(this.state.orders[order]);
        // }
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
};

export default withErrorHandler(Orders, axios);