import classes from "./Summary.module.css";

export default function Summary() {
  const DUMMY_DATA = {
    users: 100,
    orders: 100,
    earnings: 100,
    balance: 100,
  };
  return (
    <div className={classes.summary}>
      <div className={classes.card}>
        <h4>USERS</h4>
        <p>{DUMMY_DATA.users}</p>
        <div className={classes.user}>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
      <div className={classes.card}>
        <h4>ORDERS</h4>
        <p>{DUMMY_DATA.orders}</p>
        <div className={classes.order}>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
      <div className={classes.card}>
        <h4>EARNINGS</h4>
        <p>$ {DUMMY_DATA.earnings}</p>
        <div className={classes.earn}>
          <i className="fa-solid fa-dollar-sign"></i>
        </div>
      </div>
      <div className={classes.card}>
        <h4>BALANCE</h4>
        <p>$ {DUMMY_DATA.balance}</p>
        <div className={classes.balance}>
          <i className="fa-solid fa-hand-holding-dollar"></i>
        </div>
      </div>
    </div>
  );
}
