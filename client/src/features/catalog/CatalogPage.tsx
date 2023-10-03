import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsync, productSelectors } from "../../app/store/slices/catalogSlice";
import ProductList from "../product/ProductList";
import { useEffect } from "react";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, loadingStatus } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch()
  // const [products, setProducts] = useState<Product[]>([])
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // apiRequests.Catalog.list()
    //         .then(products => setProducts(products))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false))

    if(!productsLoaded) dispatch(fetchProductsAsync());
    
  }, [productsLoaded, dispatch])

  if (loadingStatus.includes('pending')) return <LoadingComponent message="Loading products... 🥱" />
  
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
