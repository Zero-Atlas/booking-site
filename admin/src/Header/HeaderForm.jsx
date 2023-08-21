import DateRanges from "./DateRanges";
import "./HeaderForm.css";
import { useRef, useState } from "react";
import { useEffect } from "react";

const HeaderForm = function () {
  const submitHandler = function (event) {
    event.preventDefault();
    window.location.replace("/search");
  };
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

  return (
    <form className="form-search" onSubmit={submitHandler}>
      <div className="form-search-group">
        <i className="fa fa-bed"></i>
        <input
          className="location"
          type="text"
          placeholder="Where are you going?"
        />
      </div>
      <div className="form-search-group date-group" ref={ref}>
        <i className="fa fa-calendar"></i>
        <input
          type="text"
          className="date-ranges"
          placeholder="From 1/1/2023 to 1/1/2025"
          onClick={dateClickHandler}
        />
        {showModal && <DateRanges />}
      </div>
      <div className="form-search-group room-size">
        <i className="fa fa-male"></i>
        <input className="adult" type="number" placeholder="1 adult" />
        <input className="children" type="number" placeholder="0 children" />
        <input className="rooms" type="number" placeholder="1 room" />
      </div>
      <div className="form-search-group">
        <button type="submit" className="btn form-search-btn">
          Search
        </button>
      </div>
    </form>
  );
};
export default HeaderForm;
