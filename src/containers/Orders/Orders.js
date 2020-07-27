import React, { Component } from "react";
import Order from "../../components/Order/order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export default class Orders extends Component {
  state = {
    orderss: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ 
              ...res.data[key], 
              id: key 
            });
        }
        this.setState({
          loading: false,
          orderss: fetchedOrders,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    return (
      <div>
          {this.state.orderss.map(order=>(
              <Order key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>
          ))}
      </div>
    );
  }
}

// export default withErrorHandler(Orders, axios);
