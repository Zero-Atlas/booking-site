import "./Combo.css";

const Combo = function (props) {
  const clickHandler=()=>{
    props.showHandler()
  }
  return (
    <div className="detail-combo">
      {/* <h3 className="title">Perfect for a 1-night stay!</h3>
      <p className="adds-text">
        Located in the real heart of Krakow, this property has an excellent
        location score of 9.8!
      </p> */}
      <p className="price">
        ${props.price} <span>(1 nights)</span>
      </p>
      <button className="btn cta-btn" onClick={clickHandler}>Reserve or Book Now!</button>
    </div>
  );
};

export default Combo;
