import { Edit, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AppPagination from "../../app/layout/AppPagination";
import {
  removeProduct,
  setPageNumber,
} from "../../app/store/slices/catalogSlice";
import { useProducts } from "../../app/hooks/useProducts";
import { useAppDispatch } from "../../app/hooks/reduxHooks";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Product } from "../../app/interfaces/product";
import apiRequests from "../../app/api/requests";
import "./InventoryPage.scss";

const InventoryPage = () => {
  const { products, pagination } = useProducts();
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  const dispatch = useAppDispatch();

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setEditMode(true);
  }

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    apiRequests.Admin.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box className='inventory-container'>
        <Typography className='inventory-typography' variant="h4">
          Inventory
        </Typography>
        <Button
          className='inventory-button'
          size="large"
          variant="contained"
          onClick={() => setEditMode(true)}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table className='inventory-table' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="inventory-row"
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box className='inventory-image-container'>
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      className='inventory-img'
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(product.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectProduct(product)}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <Box className='inventory-pagination'>
          <AppPagination
            pagination={pagination}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ currentPageNumber: page }))
            }
          />
        </Box>
      )}
    </>
  );
};

export default InventoryPage;
