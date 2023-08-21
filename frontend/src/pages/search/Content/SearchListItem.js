import { Link } from "react-router-dom";
import "./SearchListItem.css";

const SearchListItem = function (props) {
  return (
    <div className="search-item">
      {/* image */}
      <div
        className="search-item-img"
        style={{ backgroundImage: `url(${props.result.hotelInfo.img})` }}
      ></div>
      {/* detail */}
      <div className="search-item-detail">
        <h3 className="title">{props.result.roomInfo.title}</h3>
        <p className="distance">
          {props.result.hotelInfo.distance} from center
        </p>
        {/* <p className="tag">{props.result.roomInfo.tag}</p> */}
        <p className="desc">{props.result.roomInfo.desc}</p>
        <p className="type">{props.result.hotelInfo.type}</p>
        {props.result["free_cancel"] && (
          <div className="free-cancel">
            <p>Free Cancellation</p>
            <span>
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        )}
      </div>
      {/* rating and price */}
      <div className="cta">
        <div className="rating">
          {/* <div className="rate-text">{props.result.hotelInfo.rating}</div> */}
          <div className="rate">{props.result.hotelInfo.rating}</div>
        </div>
        <div className="price">
          <p>${props.result.roomInfo.price}</p>
          <span>Includes taxes and fees</span>
          <Link
            to={`/detail/${props.result.hotelInfo.hotelId}`}
            className="cta-btn btn"
          >
            See Availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchListItem;
