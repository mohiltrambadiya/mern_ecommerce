import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, LockOpen } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = useParams();
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password reset succesfully.");
      navigate("/login");
    }
  }, [dispatch, navigate, success, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="reset password" />
          <div className="formContainer">
            <div className="formBox">
              <h2 className="formHeading">Reset Password</h2>
              <form
                className="ecomForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
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
                <input
                  type="submit"
                  value="Update"
                  className="formSubmitBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
