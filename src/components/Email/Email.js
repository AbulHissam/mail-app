import React from "react";
import "./email.css";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";
import { sectionSelector } from "../../features/sectionSlice";

function Email() {
  const navigate = useNavigate();
  const section = useSelector(sectionSelector);
  let selectedMail = JSON.parse(sessionStorage.mail);

  return (
    <>
      <div className="email">
        <button
          onClick={() => {
            navigate("/");
            // When section is all mails,then display filters and clear
            section === "all mails" &&
              (document.getElementsByClassName(
                "select-filters"
              )[0].style.display = "block") &&
              (document.getElementsByClassName(
                "clear-button"
              )[0].style.display = "block");
          }}
        >
          <KeyboardBackspaceIcon />
        </button>
        <div className="email__content">
          <div className="email__subject">
            <h4>{selectedMail?.subject}</h4>
            <span>{selectedMail?.tag}</span>
          </div>
          <p>{selectedMail?.body}</p>
        </div>
      </div>
    </>
  );
}

export default Email;
