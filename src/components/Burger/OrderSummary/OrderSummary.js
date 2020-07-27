import React from 'react'
import Aux from "../../../hoc/Aux/Aux"
import Button from "../../UI/Button/Button"


 class OrderSummary extends React.Component{
     componentWillUpdate(){
         console.log("Order Summary is updating......")
     }
     render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey=>{
            return(
               <li key={igKey}>
                   <span style={{textTransform:"capitalize"}}>{igKey}
                   </span> :  {this.props.ingredients[igKey]}
                </li>
            )
        
        })
         return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious BURGER with the following ingredients</p>
            <ul>
            {ingredientSummary}
    <p><strong>Tota Price: {this.props.price.toFixed(2)}</strong></p>
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>Checkout</Button>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}> Cancel</Button>
        </Aux>
         )
     }

   
}

export default OrderSummary