import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ENTITY_NAME = "productvariation";

export default function ProductVariationsSection() {
  const { 
    data: productVariationData, 
    loading: productVariationLoading, 
    fetchItems: fetchProductVariations, 
    createItem: createProductVariation, 
    deleteItem: deleteProductVariation, 
    updateItem: updateProductVariation 
  } = useCrud(ENTITY_NAME);

  const [productIds, setProductIDs] = useState([]);
  const { data: productData, fetchItems: fetchProducts } = useCrud("products");

  const fields = [
    { label: "Product ID", name: "productId", type: "select", options: productIds, required: true },
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Price", name: "price", type: "decimal", required: true },
    { label: "Quantity in Stock", name: "quantityInStock", type: "number", required: true },
    { label: "Description", name: "description", type: "text", required: true },
  ];

  const editableFields = [
    { name: "productId", type: "select", options: productIds },
    { name: "name", type: "text" },
    { name: "price", type: "decimal" },
    { name: "quantityInStock", type: "number" },
    { name: "description", type: "text" },
  ];

  useEffect(() => {
    fetchProductVariations();
    fetchProducts();
  }, []);

  useEffect(() => {
    setProductIDs(productData.map((product) => product.id));
  }, [productData]);

  return (
    <>
      <h2>All Product Variations</h2>
      <section>
        {productVariationLoading ? (
          <p>Loading...</p>
        ) : (
          <Table data={productVariationData} editableFields={editableFields} updateItem={updateProductVariation} deleteItem={deleteProductVariation} />
        )}
      </section>

      <h2>Add Product Variation</h2>
      <section>
        <CreateForm fields={fields} createItem={createProductVariation} />
      </section>
    </>
  );
}
