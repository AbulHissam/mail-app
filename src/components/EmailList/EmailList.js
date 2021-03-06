import React from "react";
import "./emailList.css";
import { useSelector } from "react-redux";
import EmailRow from "./EmailRow";
import { sectionSelector } from "../../features/sectionSlice";
import { mailDataSelector, filterSelector } from "../../features/mailDataSlice";

function EmailList() {
  const section = useSelector(sectionSelector);
  const mailData = useSelector(mailDataSelector);
  const filters = useSelector(filterSelector);

  // When section is all mails and when there are no filters return all the mails
  // When section is and when there are filters return only the mails with tag that matches the filter
  // When section is not all mails return the mails where their tag equals to current selected section
  const filterMails = () => {
    return section === "all mails"
      ? mailData.filter((mail) => {
          return filters.length === 0 ? mail : filters.includes(mail.tag);
        })
      : mailData.filter((mail) => mail.tag === section);
  };

  return (
    <div className="emailList">
      <h4>EmailList</h4>
      {mailData.length !== 0 &&
        filterMails().map((mail) => {
          return (
            <EmailRow
              key={mail.id}
              id={mail.id}
              subject={mail.subject}
              tag={mail.tag}
              body={mail.body}
            />
          );
        })}
    </div>
  );
}

export default EmailList;
