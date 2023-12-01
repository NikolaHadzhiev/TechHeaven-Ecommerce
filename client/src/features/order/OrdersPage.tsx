import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import apiRequests from "../../app/api/requests";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/interfaces/order";
import OrderDetail from "./OrderDetail";
import { Link } from "react-router-dom";
import "./OrderPage.scss"

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(0);

  useEffect(() => {
    apiRequests.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders... 🥱" />;

  if (selectedOrder > 0)
    return (
      <OrderDetail
        order={orders?.find((o) => o.id === selectedOrder)!}
        setSelectedOrder={setSelectedOrder}
      />
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table className="order-page-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order number</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                className="order-page-row "
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">
                  ${(order.total / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {order.orderDate.split("T")[0]}
                </TableCell>
                <TableCell align="right">{order.orderStatus}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => setSelectedOrder(order.id)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {orders?.length === 0 && (
        <Typography variant='h6' className="order-page-question">
          {"Don't have any order? Buy products from "}
          <Link
            to="/catalog"
            style={{ textDecoration: "none", color: "rgb(156, 39, 176)" }}
          >
            {"catalog"}
          </Link>
        </Typography>
      )}
    </>
  );
};

export default OrdersPage;
