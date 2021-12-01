import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import ProfileImg from "../../../images/Profile.png";
import { Dashboard, Person, ExitToApp, ListAlt } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./Headers.css";
import {Backdrop} from '@material-ui/core'


const UserOptions = ({ user }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function orders() {
    navigate("/orders");
  }
  function dashboard() {
    navigate("/dashboard");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("logout succesfully.");
  }
  return (
    <Fragment>
    <Backdrop open={open} style={{zIndex:9}}/>
      <SpeedDial
        ariaLabel="SpeedDile"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{zIndex: 11}}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : ProfileImg}
            alt="profile"
          />
        }
      >
        {options &&
          options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
            ></SpeedDialAction>
          ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
