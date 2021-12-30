import React, { useRef, useState } from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  mailDataSelector,
  setSelectedMail,
} from "../../features/mailDataSlice";
import { sectionSelector } from "../../features/sectionSlice";
import Filter from "../Filter/Filter";
import { useSearchParams } from "react-router-dom";

function Header() {
  // React router
  const [searchParam, setSearchParam] = useSearchParams();

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const mails = useSelector(mailDataSelector);
  const section = useSelector(sectionSelector);

  const searchResultsRef = useRef();
  const searchRef = useRef();

  const onChangeHandler = (e) => {
    let filter = e.target.value;
    if (filter) {
      setSearchParam({ filter });
    } else {
      setSearchParam({});
    }
  };

  const onClearSearchHandler = () => {
    searchResultsRef.current.style.display = "none";
    searchRef.current.value = "";
    setSearchParam({});
  };

  const onFocusHandler = (e) => {
    e.preventDefault();
    searchResultsRef.current.style.display = "flex";
  };

  const onSearchResultClickHandler = (mail) => {
    dispatch(setSelectedMail(mail));
    searchResultsRef.current.style.display = "none";
    searchRef.current.value = "";
    navigate(`/${mail.id}`);
  };

  const filterMailsForSearch = () => {
    let filters = searchParam.get("filter");
    if (section === "all mails")
      return mails.filter((mail) => mail.subject.includes(filters));
    return mails.filter((mail) => {
      return mail.tag === section && mail.subject.includes(filters);
    });
  };

  return (
    <div className="header">
      <div className="header__search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search mail by subject"
          ref={searchRef}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
        />
        <button className="clear-search" onClick={onClearSearchHandler}>
          X
        </button>
        <div className="header__searchResults" ref={searchResultsRef}>
          {filterMailsForSearch().map((mail) => {
            return (
              <div
                key={mail.id}
                className="header__searchResultsRow"
                onClick={() => onSearchResultClickHandler(mail)}
              >
                {mail.subject}
              </div>
            );
          })}
        </div>
      </div>
      {section === "all mails" && <Filter />}
    </div>
  );
}

export default Header;
