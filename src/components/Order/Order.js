import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];
  for (let igName in props.ingredients) {
    ingredients.push({ name: igName, amount: props.ingredients[igName] });
  }
  return (
    <div className={classes.Order}>
      {ingredients.map((ig) => (
        <span
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            padding: "5px",
            border: "1px solid #ccc",
          }}
          key={ig.name}
        >
          {ig.name} ({ig.amount})
        </span>
      ))}
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
