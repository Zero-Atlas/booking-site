import "./Location.css";

const Location = function (props) {
  return (
    <div className="location">
      <div className="location-wp">
        <h2 className="name">{props.name}</h2>
        <p className="address">
          <i className="fa fa-map-marker"></i> {props.address}
        </p>
        <p className="distance">Excellent location - {props.distance}m from center</p>
        <p className="price">Book a stay over ${props.price} at this property and get a free airport taxi</p>
      </div>
      {/* <button className="btn cta-btn">Reserve or Book Now!</button> */}
    </div>
  );
};

export default Location;
