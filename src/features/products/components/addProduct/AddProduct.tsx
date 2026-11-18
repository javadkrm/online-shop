import './AddProduct.scss';

function AddProduct() {

    const handelSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Handle form submission logic here
    }

    return (
        <div className="add-product">
            <h1>Add Product</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" name="price" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" />
                </div>
                <button type="submit" onClick={handelSubmit}>Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;