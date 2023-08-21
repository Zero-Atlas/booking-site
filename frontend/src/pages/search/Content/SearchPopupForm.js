import { Form } from "react-router-dom";
import "./SearchPopupForm.css";
import { useCallback, useEffect, useRef, useState } from "react";
import DateRanges from "../../../Header/DateRanges";

const SearchPopupForm = function () {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showModal, setShowModal] = useState(false);

  // closing date picker when click outside
  const ref = useRef();
  useEffect(() => {
    const checkClickOutSide = (e) => {
      if (showModal && ref.current && !ref.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("click", checkClickOutSide);
    return () => {
      document.removeEventListener("click", checkClickOutSide);
    };
  });

  const dateClickHandler = function () {
    setShowModal(true);
  };
  const dateChangeHandler = () => {};
  const datePickHandler = useCallback((dateRange) => {
    const { startDate: startD, endDate: endD } = dateRange;
    const correctStart = new Date(
      `${startD.getMonth() + 2}/${startD.getDate()}/${startD.getFullYear()}`
    );
    const correctEnd = new Date(
      `${endD.getMonth() + 2}/${endD.getDate()}/${endD.getFullYear()}`
    );

    setStartDate(correctStart);
    setEndDate(correctEnd);
  }, []);
  let dateString = "";
  if (startDate && endDate) {
    dateString = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()} to ${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`;
  }

  return (
    <Form className="search-popup-form" action="/search" method="post">
      <div className="form-group">
        <label htmlFor="#destination">Destination</label>
        <input
          id="destination"
          className="location"
          type="text"
          name="city"
          placeholder="Where are you going?"
        />
        {/* <select id="destination" className="location" name="city">
          <option value="">Where are you going?</option>
          <option value="Ha Noi">Ha Noi</option>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
          <option value="Da Nang">Da Nang</option>
          <option value="Da Lat">Da Lat</option>
        </select> */}
      </div>
      <div className="form-group" ref={ref}>
        <label htmlFor="#check-in-date">Check-in Date</label>
        <input
          id="check-in-date"
          type="disable"
          className="date-ranges"
          placeholder="From today to 1/1/2025"
          onClick={dateClickHandler}
          value={dateString}
          onChange={dateChangeHandler}
          name="date"
        />
        {showModal && <DateRanges onChange={datePickHandler} />}
      </div>
      <div className="form-group">
        <label>Options</label>
        <div className="option-form-group">
          <label htmlFor="#min-price-input">Min price per night</label>
          <input type="number" id="min-price-input" />
        </div>
        <div className="option-form-group">
          <label htmlFor="#max-price-input">Max price per night</label>
          <input type="number" id="max-price-input" />
        </div>
        <div className="option-form-group">
          <label htmlFor="#adult-input">Adult</label>
          <input type="number" id="adult-input" placeholder="1" name="adult" />
        </div>
        <div className="option-form-group">
          <label htmlFor="#children-input">Children</label>
          <input
            type="number"
            id="children-input"
            placeholder="0"
            name="children"
          />
        </div>
        <div className="option-form-group">
          <label htmlFor="#room-input">Room</label>
          <input type="number" id="room-input" placeholder="1" name="rooms" />
        </div>
      </div>
      <button type="submit" className="btn btn-popup-submit">
        Search
      </button>
    </Form>
  );
};
export default SearchPopupForm;
