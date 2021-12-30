import React from "react";
import "./email.css";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector } from "react-redux";
import { sectionSelector } from "../../features/sectionSlice";
import { mailDataSelector } from "../../features/mailDataSlice";
import { useParams } from "react-router-dom";
function Email() {
  // const navigate = useNavigate();
  // const section = useSelector(sectionSelector);
  let selectedMail = JSON.parse(sessionStorage.mail);
  let mailData = useSelector(mailDataSelector);
  let params = useParams();

  const findMail = (emailId) => {
    return mailData.find((mail) => {
      return mail.id === emailId;
    });
  };
  let mail = findMail(parseInt(params.emailId));

  return (
    <>
      <div className="email">
        <div className="email__content">
          <div className="email__subject">
            <h4>{mail?.subject}</h4>
            <span>{mail?.tag}</span>
          </div>
          <p>{mail?.body}</p>
        </div>
      </div>
    </>
  );
}

export default Email;
