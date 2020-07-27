/* eslint-disable no-unused-vars */
import React from "react";
import classes from "./BurgerIngrediant.css";
import PropTypes from "prop-types";
import { render } from "react-dom";

class BurgerIngredient extends React.Component{
    render(){
            let ingredient = null;
            // eslint-disable-next-line default-case
            switch (this.props.type) {
              case "bread-bottom":
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
              case "bread-top":
                ingredient = (
                  <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                  </div>
                );
                break;
              case "meat":
                ingredient = <div className={classes.Meat}></div>;
                break;
              case "salad":
                ingredient = <div className={classes.Salad}></div>;
                break;
              case "cheese":
                ingredient = <div className={classes.Cheese}></div>;
                break;
              case "bacon":
                ingredient = <div className={classes.Bacon}></div>;
                break;
                default:
                    ingredient=null
            }
            return ingredient;
        
    }
} 

BurgerIngredient.propTypes={
    type:PropTypes.string.isRequired
}
export default BurgerIngredient;
