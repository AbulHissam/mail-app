import React from "react";
import "./email.css";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";
import { selectedMailSelector } from "../../features/mailDataSlice";
import { sectionSelector } from "../../features/sectionSlice";

function Email() {
  const navigate = useNavigate();
  const section = useSelector(sectionSelector);
  let selectedMail = JSON.parse(sessionStorage.mail);

  // console.log(selectedMail);
  return (
    <>
      <div className="email">
        <button
          onClick={() => {
            navigate("/");
            section === "all mails" &&
              (document.getElementsByClassName(
                "select-filters"
              )[0].style.display = "block") &&
              (document.getElementsByClassName(
                "clear-button"
              )[0].style.display = "block");
            // selectedMail && sessionStorage.removeItem("mail");
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
