
import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";
import CartContext from "../../store/cart-context";


const HeaderCardButton = (props) => {
  const [btnMove, setBtnMove] = useState(false);
  const cartCtx = useContext(CartContext);

  const mumOfItemInCart = cartCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount
  },0)

  const {items} = cartCtx;

  const btnClasses = `${classes.button} ${btnMove ? classes.bump : ""}`;

  useEffect(() => {
     if (items.length === 0 ){
       return
     }
     setBtnMove(true);
     
    const timer = setTimeout(() => {
       setBtnMove(false)
     }, 300);

     return () => {
       clearTimeout(timer); 
     }
  },[items]);
  
  return (
    <button 
      className={btnClasses}
      onClick={props.showCartHandler}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{mumOfItemInCart}</span>
    </button>
  );
};

export default HeaderCardButton;
