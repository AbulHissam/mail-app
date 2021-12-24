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

function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const mails = useSelector(mailDataSelector);
  const section = useSelector(sectionSelector);

  const searchResultsRef = useRef();
  const searchRef = useRef();

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClearSearchHandler = () => {
    searchResultsRef.current.style.display = "none";
    searchRef.current.value = "";
    setSearchTerm("");
  };

  const onFocusHandler = (e) => {
    e.preventDefault();
    searchResultsRef.current.style.display = "flex";
  };

  const onSearchResultClickHandler = (mail) => {
    dispatch(setSelectedMail(mail));
    searchResultsRef.current.style.display = "none";
    searchRef.current.value = "";
    setSearchTerm("");
    navigate("/mail");
  };

  const filterMailsForSearch = () => {
    return mails.filter((mail) => {
      if (section === "all mails") {
        return mail && mail.subject.includes(searchTerm);
      } else if (searchTerm === "") {
        return mail.tag === section;
      } else if (mail.tag === section && mail.subject.includes(searchTerm)) {
        return true;
      }
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
