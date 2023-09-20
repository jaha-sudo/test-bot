import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("true"); // Default: Display orders with status "true"

  useEffect(() => {
    fetch(
      `http://192.168.77.91:9000/admin/orders/get?status=${filterStatus}&limit=100&offset=0`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.data && data.data.orders) {
          setOrders(data.data.orders);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [filterStatus]);

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Container sx={{ mt: "2rem" }}>
      <RadioGroup
        row
        aria-label="status"
        name="status"
        value={filterStatus}
        onChange={handleStatusChange}
        style={{ marginBottom: "16px" }}
      >
        <FormControlLabel
          value="true"
          control={<Radio />}
          label="Status: kabul edilen"
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="Status: kabul edilmedik"
        />
      </RadioGroup>

      {orders.map((order) => (
        <Paper
          key={order.order_id}
          elevation={3}
          style={{ margin: "16px", padding: "16px" }}
        >
          <Typography variant="h5">Order ID: {order.order_id}</Typography>
          <Typography variant="h6">User Number: {order.user_number}</Typography>
          <Typography variant="body1">Chat ID: {order.chat_id}</Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Product Price</TableCell>
                  <TableCell>Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.product_price}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Container>
  );
}

export default OrdersTable;
