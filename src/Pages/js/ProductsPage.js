import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const PRODUCT_ENTITY_NAME = "product";
const PRODUCT_VARIATION_ENTITY_NAME = "productvariation";

const fields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Tax ID", name: "taxId", type: "text", required: false },
  { label: "Price", name: "price", type: "decimal", required: true },
  { label: "Quantity in Stock", name: "quantityInStock", type: "number", required: true },
  { label: "Description", name: "description", type: "text", required: true }
];

const editableFields = [
  { name: "name", type: "text" },
  { name: "taxId", type: "text" },
  { name: "price", type: "decimal" },
  { name: "quantityInStock", type: "number" },
  { name: "description", type: "text" }
];

const productVariationFields = [
  { label: "Product ID", name: "productId", type: "text", required: true },
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Price", name: "price", type: "decimal", required: true },
  { label: "Quantity in Stock", name: "quantityInStock", type: "number", required: true },
  { label: "Description", name: "description", type: "text", required: true }
];

const productVariationEditableFields = [
  { name: "productId", type: "text" },
  { name: "name", type: "text" },
  { name: "price", type: "decimal" },
  { name: "quantityInStock", type: "number" },
  { name: "description", type: "text" }
];


export default function ProductsPage() {
  const { data: productData, loading: productLoading, fetchItems: fetchProducts, fetchItemById: fetchProductById, createItem: createProduct, deleteItem: deleteProduct, updateItem: updateProduct } = useCrud(PRODUCT_ENTITY_NAME + "s");
  const { data: productVariationData, loading: productVariationLoading, fetchItems: fetchProductVariations, fetchItemById: fetchProductVariationById, createItem: createProductVariation, deleteItem: deleteProductVariation, updateItem: updateProductVariation } = useCrud(PRODUCT_VARIATION_ENTITY_NAME);
  const [fromID, setFromID] = useState(null);

  // Initial load for products and product variations
  useEffect(() => {
    fetchProducts();
    fetchProductVariations();
  }, []);

  // Update fromID (if it's not null) when data changes
  useEffect(() => {
    if (fromID?.id) {
      const updatedProduct = productData.find((entity) => entity.id === fromID.id);
      if (updatedProduct) {
        setFromID(updatedProduct);
      } else {
        setFromID(null);
      }
    }
  }, [productData, setFromID]);

  const handleGetById = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const id = Object.fromEntries(formData).id;

    const response = await fetchProductById(id);
    setFromID(response);
  };

  return (
    <>
      <h1>All Products</h1>
      <section>
        {productLoading ? (
          <p>Fetching products...</p>
        ) : (
          <Table data={productData} editableFields={editableFields} updateItem={updateProduct} deleteItem={deleteProduct} />
        )}
      </section>

      <h1>Add Product</h1>
      <section>
        <CreateForm fields={fields} createItem={createProduct} />
      </section>

      <h1>Get Product by ID</h1>
      <section>
        <form onSubmit={handleGetById}>
          <label>
            ID: <input type="text" name="id" required />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {!fromID || fromID.status >= 400 ? null : (
          <Table data={[fromID]} editableFields={editableFields} updateItem={updateProduct} deleteItem={deleteProduct} />
        )}
      </section>

      <h1>All Product Variations</h1>
      <section>
        {productVariationLoading ? (
          <p>Fetching product variations...</p>
        ) : (
          <Table data={productVariationData} editableFields={productVariationEditableFields} updateItem={updateProductVariation} deleteItem={deleteProductVariation} />
        )}
      </section>

      <h1>Add Product Variation</h1>
      <section>
        <CreateForm fields={productVariationFields} createItem={createProductVariation} />
      </section>

    </>
  );
}
