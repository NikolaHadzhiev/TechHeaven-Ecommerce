import apiRequests from "../../app/api/requests";
import { Product } from "../../app/interfaces/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    apiRequests.Catalog.list()
            .then(products => {
                setProducts(products)
            })
            .catch(error => console.log(error))
    
  }, [])

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
