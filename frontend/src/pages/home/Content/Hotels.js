import { Link } from "react-router-dom";
import "./Hotels.css";
const Hotels = function (props) {
  const hotelsList = props.data;

  return (
    <section className="hotels">
      <h2 className="section-title">Homes guests love</h2>
      <div className="hotels-list">
        {hotelsList.map((h) => (
          <div key={h.name} className="hotel-container">
            <Link to={`/detail/${h._id}`}>
              <div
                className="hotel-img"
                style={{ backgroundImage: `url(${h.photos[0]})` }}
              ></div>
            </Link>
            <Link className="hotel-link" to={`/detail/${h._id}`}>
              {h.name}
            </Link>
            <p className="hotel-city">{h.city}</p>
            <p className="price">Starting from ${h.cheapestPrice}</p>
            <div className="rating">
              <p className="score">{h.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Hotels;
