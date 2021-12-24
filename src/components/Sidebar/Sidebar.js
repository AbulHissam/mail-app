import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarOptions from "./SidebarOptions";
import InboxIcon from "@mui/icons-material/Inbox";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { sectionSelector } from "../../features/sectionSlice";
import { useSelector } from "react-redux";

function Sidebar() {
  let section = useSelector(sectionSelector);

  return (
    <div className="sidebar">
      <SidebarOptions
        title="Inbox"
        icon={<InboxIcon />}
        selected={section === "inbox" ? true : false}
      />
      <SidebarOptions
        title="Draft"
        icon={<DescriptionIcon />}
        selected={section === "draft" ? true : false}
      />
      <SidebarOptions
        title="Spam"
        icon={<WarningRoundedIcon />}
        selected={section === "spam" ? true : false}
      />
      <SidebarOptions
        title="Trash"
        icon={<DeleteIcon />}
        selected={section === "trash" ? true : false}
      />
      <SidebarOptions
        title="All Mails"
        icon={<EmailIcon />}
        selected={section === "all mails" ? true : false}
      />
    </div>
  );
}

export default Sidebar;
