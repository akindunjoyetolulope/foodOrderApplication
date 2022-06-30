import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealIteam";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);
  // const [Loading, setLoading] = useState(true);
  const { isPending, isErr, sendReq } = useHttp();

  useEffect(() => {
    const config = {
      url: "https://addtocart-88ffc-default-rtdb.firebaseio.com/meals.json",
    };

    const applyData = (data) => {
      let allData = [];
      for (let key in data) {
        allData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setDummyMeals(allData);
    };

    sendReq(config, applyData);
  }, [sendReq]);

  const mealslist = dummyMeals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));

  if (isPending) {
    return (
      <section className={classes.mealsloading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (isErr) {
    return (
      <section className={classes.mealsloading}>
        <p>{isErr}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {dummyMeals && <ul>{mealslist}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
