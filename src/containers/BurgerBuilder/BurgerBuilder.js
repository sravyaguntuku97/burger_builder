import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
//REDUX
import {connect} from "react-redux"
import * as actionTypes from "../../store/actions"



class BurgerBuilder extends Component {
  state = {
    // ingredients:null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  };

// componentDidMount(){
//   axios.get("https://react-my-burger-50be3.firebaseio.com/ingredients.json")
//   .then(res=>{
//     console.log(res)
//     this.setState({
//         ingredients:res.data
//     })
//   })
//   .catch(error=>{
//     this.setState({
//       error:true
//     })
//   })
// }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchasable: sum > 0 });
        return  sum > 0 ;

  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout")
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
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
            this.props.ings?(
              <OrderSummary
              ingredients={this.props.ings}
              purchaseContinued={this.purchaseContinueHandler}
              purchaseCancelled={this.purchaseCancelHandler}
              price={this.props.price}
            />
            ):(null)
           
          )} 
        </Modal>
    
    {this.props.ings?(
      <Aux>
            <Burger ingredients={this.props.ings} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientremoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ings)}
          price={this.props.price}
          ordered={this.purchaseHandler}
        />
      </Aux>
    ):(<Spinner/>)}  
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
      ings : state.ingredients,
      price: state.totalPrice
  }

}
const mapDispatchToProps = (dispatch) =>{
  return{
      onIngredientAdded: (ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
      onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler (BurgerBuilder, axios));
