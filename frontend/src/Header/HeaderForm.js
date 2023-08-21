import DateRanges from "./DateRanges";
import "./HeaderForm.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Form } from "react-router-dom";
import { useCallback } from "react";

const HeaderForm = function () {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showModal, setShowModal] = useState(false);
  const dateClickHandler = function () {
    setShowModal(true);
  };

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
  const dateChangeHandler = () => {};

  let dateString = "";
  if (startDate && endDate) {
    dateString = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()} to ${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`;
  }
  return (
    <Form className="form-search" action="/search" method="post">
      <div className="form-search-group">
        <i className="fa fa-bed"></i>
        <input type="text" name="city" placeholder="Where are you going?"/>
        {/* <select className="location" name="city">
          <option value="">Where are you going?</option>
          <option value="Ha Noi">Ha Noi</option>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
          <option value="Da Nang">Da Nang</option>
          <option value="Da Lat">Da Lat</option>
        </select> */}
      </div>
      <div className="form-search-group date-group" ref={ref}>
        <i className="fa fa-calendar"></i>
        <input
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
      <div className="form-search-group room-size">
        <i className="fa fa-male"></i>
        <input
          className="adult"
          type="number"
          placeholder="1 adult"
          name="adult"
        />
        <input
          className="children"
          type="number"
          placeholder="0 children"
          name="children"
        />
        <input
          className="rooms"
          type="number"
          placeholder="1 room"
          name="rooms"
        />
      </div>
      <div className="form-search-group">
        <button type="submit" className="btn form-search-btn">
          Search
        </button>
      </div>
    </Form>
  );
};
export default HeaderForm;
