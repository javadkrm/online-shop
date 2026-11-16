async function getProducts () {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }   
    return response.json();
}

export { getProducts };