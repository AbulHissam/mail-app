import React from "react";
import "./emailRow.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { sectionSelector } from "../../features/sectionSlice";

function EmailRow({ id, subject, tag, body }) {
  const navigate = useNavigate();
  const section = useSelector(sectionSelector);

  // When a mail is clicked dispatch selected mail and navigate to mail page
  // When mail screen is open hide filter and clear
  const handleRowClick = () => {
    let mail = {
      id,
      tag,
      subject,
      body,
    };
    navigate(`/${mail.id}`);
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
