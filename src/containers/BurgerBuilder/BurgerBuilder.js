import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {

    ingredients:null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  };

componentDidMount(){
  axios.get("https://react-my-burger-50be3.firebaseio.com/ingredients.json")
  .then(res=>{
    console.log(res)
    this.setState({
        ingredients:res.data
    })
  })
  .catch(error=>{
    this.setState({
      error:true
    })
  })
}

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    const updatedCount = oldCount + 1;
    const updatedIngredents = {
      ...this.state.ingredients,
    };
    updatedIngredents[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredents,
    });
    this.updatePurchaseState(updatedIngredents);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return alert(`You dont have ingredients to remove`);
    }
    const updatedCount = oldCount - 1;
    const updatedIngredents = {
      ...this.state.ingredients,
    };
    updatedIngredents[type] = updatedCount;
    const priceDeletion = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeletion;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredents,
    });
    this.updatePurchaseState(updatedIngredents);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
  
      let queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname:"/checkout",
      search:'?' + queryString

    })
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.state.loading  ? (
             this.state.error?(<p>Ingredients cant be loaded...!!!</p>): (<Spinner />)
          ) : (
            this.state.ingredients?(
              <OrderSummary
              ingredients={this.state.ingredients}
              purchaseContinued={this.purchaseContinueHandler}
              purchaseCancelled={this.purchaseCancelHandler}
              price={this.state.totalPrice}
            />
            ):(null)
           
          )} 
        </Modal>
    
    {this.state.ingredients?(
      <Aux>
            <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientremoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    ):(<Spinner/>)} 
       
       
      
       
      </Aux>
    );
  }
}
export default WithErrorHandler (BurgerBuilder, axios);
