import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
// import { useStoreContext } from "../../app/hooks/useStoreContext";
import { useAppSelector } from "../../app/hooks/reduxHooks";

interface Props {
    subtotal?: number;
}

const OrderSummary = ({ subtotal }: Props) =>  {
    // const {shoppingCart} = useStoreContext();
    const {shoppingCart} = useAppSelector(state => state.shoppingCart);

    if(subtotal === undefined) subtotal = shoppingCart?.items.reduce((value, item) => value + (item.quantity * item.price), 0) ?? 0;
    
    const deliveryFee = subtotal > 5000 ? 0 : 500;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">${(subtotal / 100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">${(deliveryFee / 100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">${((subtotal + deliveryFee) / 100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $50 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default OrderSummary