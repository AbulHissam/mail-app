import React, { useEffect, useRef, useState } from "react";
import "./filter.css";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { updateFilters } from "../../features/mailDataSlice";

const options = [
  { value: "inbox", label: "Inbox" },
  { value: "draft", label: "Draft" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" },
];

function Filter() {
  const dispatch = useDispatch();
  const selectRef = useRef();

  const [appliedFilters, setAppliedFilters] = useState([]);

  let displayFilters = [];
  try {
    displayFilters = JSON.parse(sessionStorage.getItem("filtersDisplay"));
    if (!displayFilters) {
      sessionStorage.setItem("filtersDisplay", JSON.stringify([]));
      displayFilters = JSON.parse(sessionStorage.getItem("filtersDisplay"));
    }
  } catch (err) {}

  const onClickHandler = () => {
    try {
      sessionStorage.removeItem("filtersFromStorage");
      sessionStorage.removeItem("filtersDisplay");
      selectRef.current.clearValue();
      dispatch(updateFilters({ filters: [] }));
    } catch (err) {}
  };

  useEffect(() => {
    appliedFilters.length !== 0 &&
      dispatch(updateFilters({ filters: [...appliedFilters] }));
    appliedFilters.length !== 0 &&
      sessionStorage.setItem("filtersDisplay", JSON.stringify(appliedFilters));
  });

  return (
    <>
      <Select
        ref={selectRef}
        options={options}
        isMulti
        isClearable={false}
        defaultValue={displayFilters}
        onChange={setAppliedFilters}
        className="select-filters"
        placeholder="Filter"
      />
      <button className="clear-button" onClick={onClickHandler}>
        Clear
      </button>
    </>
  );
}

export default Filter;
