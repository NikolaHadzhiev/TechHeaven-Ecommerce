import { Box, Typography, Button, Grid } from "@mui/material";
import { Order } from "../../app/interfaces/order";
import ShoppingCartTable from "../shoppingCart/ShoppingCartTable";
import OrderSummary from "../shoppingCart/OrderSummary";
import { ShoppingItem } from "../../app/interfaces/shoppingItem";
import "./OrderDetail.scss"

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

const OrderDetail = ({ order, setSelectedOrder }: Props) => {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

    return (
        <>
            <Box className="order-details-container">
                <Typography className="order-details-text" gutterBottom variant='h4'>Order# {order.id} - {order.orderStatus}</Typography>
                <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>Back to orders</Button>
            </Box>
            <ShoppingCartTable items={order.orderItems as ShoppingItem[]} isShoppingCart={false} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <OrderSummary subtotal={subtotal}/>
                </Grid>
            </Grid>
        </>
    )
}

export default OrderDetail