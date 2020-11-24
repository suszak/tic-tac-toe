import React from "react";
import { useSelector } from "react-redux";
import "./StartPage.scss";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

function StartPage() {
  const form = useSelector((state) => state.form);

  return (
    <div className="startPage">
      {form.formType === "login" ? <Login /> : <Register />}
    </div>
  );
}

export default StartPage;
