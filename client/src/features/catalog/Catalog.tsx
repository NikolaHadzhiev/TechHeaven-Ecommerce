import apiRequests from "../../app/api/requests";
import { Product } from "../../app/interfaces/product";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequests.Catalog.list()
            .then(products => setProducts(products))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    
  }, [])

  if (loading) return <LoadingComponent message="Loading products..." />
  
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
