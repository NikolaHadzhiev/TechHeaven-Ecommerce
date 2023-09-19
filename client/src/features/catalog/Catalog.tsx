import { Product } from "../../app/interfaces/product";

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog = ({products, addProduct}: Props) => {
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </>
  );
};

export default Catalog;
