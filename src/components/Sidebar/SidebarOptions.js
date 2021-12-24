import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedSection } from "../../features/sectionSlice";
import "./sidebarOptions.css";

function SidebarOptions({ icon, title, selected }) {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(
      setSelectedSection({
        section: title.toLowerCase(),
      })
    );
    navigate("/");
  };

  return (
    <div
      className={`sidebarOptions ${selected && "sidebarOption--active"}`}
      onClick={onClickHandler}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}

export default SidebarOptions;
