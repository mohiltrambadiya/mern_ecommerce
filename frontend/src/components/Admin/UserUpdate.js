import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import {
  updateUser,
  clearErrors,
  getUserDetail,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { useParams, useNavigate } from "react-router-dom";
import {
  UPDATE_USER_RESET,
  USER_DETAIL_RESET,
} from "../../constants/userConstants";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userdetail);
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = useSelector((state) => state.useraction);
  const { userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetail(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
      dispatch({ type: USER_DETAIL_RESET });
    }
  }, [dispatch, alert, error, navigate, success, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
        {loading || updateLoading ? <Loader/> : (
             <Fragment>
             <MetaData title="Update User" />
             <div className="dashboard">
               <SideBar />
               <div className="newProductContainer">
                 {loading ? (
                   <Loader />
                 ) : (
                   <form
                     className="createProductForm"
                     onSubmit={updateUserSubmitHandler}
                   >
                     <h1>Update User</h1>
       
                     <div>
                       <PersonIcon />
                       <input
                         type="text"
                         placeholder="Name"
                         required
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                       />
                     </div>
                     <div>
                       <MailOutlineIcon />
                       <input
                         type="email"
                         placeholder="Email"
                         required
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                       />
                     </div>
       
                     <div>
                       <VerifiedUserIcon />
                       <select value={role} onChange={(e) => setRole(e.target.value)}>
                         <option value="">Choose Role</option>
                         <option value="admin">Admin</option>
                         <option value="user">User</option>
                       </select>
                     </div>
       
                     <Button
                       id="createProductBtn"
                       type="submit"
                       disabled={
                         updateLoading ? true : false || role === "" ? true : false
                       }
                     >
                       Update
                     </Button>
                   </form>
                 )}
               </div>
             </div>
           </Fragment>
        )}
    </Fragment>
  );
};

export default UserUpdate;
