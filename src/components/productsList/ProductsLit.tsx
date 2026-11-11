import { useGetProductsQuery } from "../../services/productsApi";


function ProductsList() {
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Something went wrong!</p>
        <button onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Products</h2>

      {isFetching && <p>Updating...</p>}

      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <img src={product.image} width="100" alt={product.title} />
        </div>
      ))}
    </div>
  );
}

export default ProductsList;