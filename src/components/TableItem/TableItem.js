import React from "react";
import "./TableItem.scss";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function TableItem({ userLogin, isAdmin }) {
  return (
    <div className="tableItem">
      <p className="tableItem__element">{userLogin}</p>
      <p className="tableItem__element">
        {isAdmin ? <CheckCircleOutlineIcon className="admin" /> : <HighlightOffIcon className="noAdmin" />}
        <button className="button">Change</button>
      </p>
      <p className="tableItem__element">
        <input type="text" className="input" placeholder="Type new password..."></input>
        <button className="button">Save</button>
      </p>
      <p className="tableItem__element">
        <button className="button">Delete user</button>
      </p>
    </div>
  );
}

export default TableItem;
