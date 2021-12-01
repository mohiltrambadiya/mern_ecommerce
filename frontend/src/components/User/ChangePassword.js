import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { VpnKey, Lock, LockOpen } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, changePassword } from "../../actions/userAction";
import "./changePassword.css";
import { PASSWORD_UPDATE_RESET } from "../../constants/userConstants";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const changePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(changePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({
        type: PASSWORD_UPDATE_RESET,
      });
      navigate("/account");
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <Fragment>
      <MetaData title="change password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Change Password</h2>
          <form className="updatePasswordForm" onSubmit={changePasswordSubmit}>
            <div className="signUpPassword">
              <VpnKey />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="signUpPassword">
              <LockOpen />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="signUpPassword">
              <Lock />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                name="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Change" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ChangePassword;
