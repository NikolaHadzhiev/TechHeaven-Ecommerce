import React, { useEffect, useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../interfaces/product';
import Header from './Header';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:5095/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  function addProduct(){
    setProducts(prevState => [...prevState, {
      id: prevState.length + 101,
      name: 'product' + (prevState.length + 1),
      description: 'some description',
      price: (prevState.length * 100) + 100,
      pictureUrl: 'http://picsum.photos/200',
      type: 'Phone',
      brand: 'some brand',
      quantityInStock: 100
    }])
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct}/>
      </Container>
    </>
  );
}

export default App;
