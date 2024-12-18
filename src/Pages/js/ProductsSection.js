import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import fetchDataFromApi from "../../api/fetchLogic";

const ENTITY_NAME = "product";

export default function ProductsSection() {
  const [taxIDs, setTaxIDs] = useState([]);
  const { 
    data: productData, 
    loading: productLoading, 
    fetchItems: fetchProducts, 
    createItem: createProduct, 
    deleteItem: deleteProduct, 
    updateItem: updateProduct 
  } = useCrud(`${ENTITY_NAME}s`);

  const fields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Tax ID", name: "taxId", type: "select", options: taxIDs, required: false },
    { label: "Price", name: "price", type: "decimal", required: true },
    { label: "Quantity in Stock", name: "quantityInStock", type: "number", required: true },
    { label: "Description", name: "description", type: "text", required: true },
  ];

  const editableFields = [
    { name: "name", type: "text" },
    { name: "price", type: "decimal" },
    { name: "quantityInStock", type: "number" },
    { name: "description", type: "text" },
  ];

  useEffect(() => {
    const fetchAllEntityIDs = async (entityName, setFunc) => {
        try {
          const entity = await fetchDataFromApi(entityName);
          setFunc(entity.map((entity) => entity.id));
          setFunc(prev => [...prev, ""]);
        } catch (error) {
          console.error("Error fetching IDs:", error);
        }
      };
    fetchAllEntityIDs("taxes", setTaxIDs);
    fetchProducts();
  }, []);
  //TODO: make a select that fetches all product variations from that product
  return (
    <>
      <h2>All Products</h2>
      <section>
        {productLoading ? (
          <p>Loading...</p>
        ) : (
          <Table data={productData} editableFields={editableFields} updateItem={updateProduct} deleteItem={deleteProduct} />
        )}
      </section>

      <h2>Add Product</h2>
      <section>
        <CreateForm fields={fields} createItem={createProduct} />
      </section>
    </>
  );
}
