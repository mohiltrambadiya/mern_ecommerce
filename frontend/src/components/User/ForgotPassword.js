import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { MailOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [message, error, dispatch, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="forgot password" />
          <div className="formContainer">
            <div className="formBox">
              <h2 className="formHeading">Forgot Password</h2>
              <form
                className="ecomForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Change"
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

export default ForgotPassword;
