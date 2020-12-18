import "./TableItem.scss";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { checkDeleteSuccess } from "./helpers/checkDeleteSuccess";
import { checkPasswordChangeSuccess } from "./helpers/checkPasswordChangeSuccess";
import { checkAdminStatusChangeSuccess } from "./helpers/checkAdminStatusChangeSuccess";

function TableItem({ userLogin, isAdmin }) {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const handlePassword = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="tableItem">
      <p className="tableItem__element">{userLogin}</p>
      <p className="tableItem__element">
        {isAdmin ? (
          <CheckCircleOutlineIcon className="admin" />
        ) : (
          <HighlightOffIcon className="noAdmin" />
        )}
        <button
          className="button"
          onClick={() =>
            checkAdminStatusChangeSuccess({ userLogin, isAdmin, dispatch })
          }
        >
          Change
        </button>
      </p>
      <p className="tableItem__element">
        <input
          type="text"
          className="input"
          placeholder="Type new password..."
          onChange={handlePassword}
          value={newPassword}
        ></input>
        <button
          className="button"
          onClick={() =>
            checkPasswordChangeSuccess({
              userLogin,
              newPassword,
              setNewPassword,
              dispatch,
            })
          }
        >
          Save
        </button>
      </p>
      <p className="tableItem__element">
        <button
          className="button"
          onClick={() => checkDeleteSuccess({ userLogin, dispatch })}
        >
          Delete user
        </button>
      </p>
    </div>
  );
}

export default TableItem;
