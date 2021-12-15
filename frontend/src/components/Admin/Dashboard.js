import React, { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getAdminProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { getAllOrder } from "../../actions/orderAction.js";
import { getAllUser } from "../../actions/userAction.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let outOfStock = 0;
  const { loading, error, products } = useSelector((state) => state.products);
  const {
    loading: orderLoading,
    error: orderError,
    orders,
  } = useSelector((state) => state.allorder);
  const {
    loading: userLoading,
    error: userError,
    users,
  } = useSelector((state) => state.alluser);
  products &&
    products.forEach((item) => {
      if (item.stock < 1) {
        outOfStock += 1;
      }
    });
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.total_price;
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (orderError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (userError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrder());
    dispatch(getAllUser());
  }, [dispatch, alert, error, orderError, userError]);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <Fragment>
      {loading || orderLoading || userLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
              <Typography component="h1">Dashboard</Typography>
              <div className="dashboardSummary">
                <div>
                  <p>
                    Total Amount <br /> ₹{totalAmount}
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Products</p>
                    <p>{products && products.length}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
                  </Link>
                </div>
              </div>
              <div className="lineChart">
                <Line data={lineState} />
              </div>

              <div className="doughnutChart">
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
