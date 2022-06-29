import { Fragment } from "react";


import HeaderCardButton from "./HeaderCardButton";
import mealsImage from "../../assets/meals.jpeg";
import classes from './Header.module.css'

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
          <h1>React Meals</h1>
          <HeaderCardButton showCartHandler={props.onShow}/>
      </header>
      <div className={classes['main-image']}>
          <img src={mealsImage} alt="A table full of delicious food!"/>
      </div>
    </Fragment>
  );
};

export default Header;
