import classes from "./RoomCard.module.css";

export default function RoomCard(props) {
  const checkboxHandler = (event) => {
    props.onChange(event.target.checked, event.target.value, props.data.price);
  };
  return (
    <li className={classes.card}>
      <div className={classes.text}>
        <h4>{props.data.title}</h4>
        <p className={classes.desc}>{props.data.desc}</p>
        <p className={classes.people}>
          Max people: <strong>{props.data.maxPeople}</strong>
        </p>
        <p className={classes.price}>${props.data.price}</p>
      </div>
      <ul className={classes.number}>
        {props.data.roomNumbers.map((num) => (
          <li key={num}>
            <label htmlFor={props.data._id + "_room_" + num}>{num}</label>
            <input
              type="checkbox"
              name={num}
              value={props.data._id + "_room_" + num}
              id={props.data._id + "_room_" + num}
              onChange={checkboxHandler}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}
