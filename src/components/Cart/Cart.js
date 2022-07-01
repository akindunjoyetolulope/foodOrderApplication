import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {

  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckOut] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const itHasItem = cartCtx.items.length > 0;

  const { isPending, isErr, sendReq } = useHttp();

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = (userData) => {
     const config = {
      url: 'https://addtocart-88ffc-default-rtdb.firebaseio.com/order.json',
      method: 'POST',
      body: {
        user: userData,
        orderedItem:cartCtx.items
      }      
    }
    const applyData = (data) => {
      console.log(data)
    }

    sendReq(config, applyData)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHide}>
        Close
      </button>
      {itHasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onHide={props.onHide}>
      {cartItems}
      <div className={classes.total}>
        <span>total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHide} submitOrderHandler={submitOrderHandler}/>}
      {!isCheckout && modalAction}
    </Modal>
  );
};

export default Cart;
