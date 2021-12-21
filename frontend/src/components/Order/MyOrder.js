import React, { Fragment, useEffect } from "react";
import { Launch } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrder, clearErrors } from "../../actions/orderAction";
import {Link} from 'react-router-dom'

const MyOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { loading, orders, error } = useSelector((state) => state.myorder);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.8 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/order/${params.getValue(params.id, "id")}`}>
              <Launch />
            </Link>
          );
        },
      },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.order_items.length,
        id: item._id,
        status: item.order_status,
        amount: item.total_price,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMyOrder());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="My Order(s)" />
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="myOrdersTable"
            />
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrder;
