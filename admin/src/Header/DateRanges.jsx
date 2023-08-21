import "./DateRanges.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import React from "react";

const DateRanges = function (props) {
  const [selection, setSelection] = React.useState([
    {
      startDate: new Date(2023, 1, 1),
      endDate: null,
      key: "selection",
    },
  ]);
  const changeHandler = function (value) {
    return setSelection([value.selection]);
  };

  return (
    <div className="date-pick-modal">
      <DateRange
        className="date-picker"
        ranges={selection}
        onChange={changeHandler}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        portalId="root"
      />
    </div>
  );
};

export default DateRanges;
