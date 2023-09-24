import { Product } from "../../app/interfaces/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:5095/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
