import React from "react";
import "./emailRow.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMail } from "../../features/mailDataSlice";
import { sectionSelector } from "../../features/sectionSlice";

function EmailRow({ id, subject, tag, body }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const section = useSelector(sectionSelector);

  const handleRowClick = () => {
    let mail = {
      id,
      tag,
      subject,
      body,
    };
    dispatch(setSelectedMail(mail));
    navigate("/mail");
    section === "all mails" &&
      (document.getElementsByClassName("select-filters")[0].style.display =
        "none") &&
      (document.getElementsByClassName("clear-button")[0].style.display =
        "none");
  };

  return (
    <div className="emailRow" onClick={handleRowClick}>
      <h3 className="emailRow__subject">{subject}</h3>
      <div className="emailRow__tag">{tag}</div>
    </div>
  );
}

export default EmailRow;
