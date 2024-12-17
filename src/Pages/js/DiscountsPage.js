import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ENTITY_NAME = "discount";

//thsese dont particularly need to be out here, but i think its good practice to have constants out of the export function
const fields = [
  { label: "Name", name: "name", type: "text", required: false },
  { label: "Value", name: "value", type: "decimal", required: true },
  { 
    label: "Discount Target", 
    name: "discountTarget", 
    type: "select", 
    options: ["Order", "Product"], 
    required: true 
  },
  { label: "Product ID", name: "productId", type: "text", required: false },
  { label: "Start Date", name: "startDate", type: "datetime-local", required: true },
  { label: "End Date", name: "endDate", type: "datetime-local", required: true },
];

const editableFields = [
  { name: "name", type: "text" },
  { name: "value", type: "decimal" },
  { 
    name: "discountTarget", 
    type: "select", 
    options: ["Order", "Product"] 
  },
  { name: "productId", type: "text" },
  { name: "startDate", type: "datetime-local" },
  { name: "endDate", type: "datetime-local" },
];


export default function DiscountsPage() {
  const { data, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud(ENTITY_NAME+"s");  
  const [fromID, setfromID] = useState(null);
  
  //initial load
  useEffect(() => {
    fetchItems();
  }, []);

  //update fromID (if its not null) when data changes
  useEffect(() => {
    if (fromID?.id) {
      const updatedEntity = data.find((entity) => entity.id === fromID.id);
      if (updatedEntity) {
        setfromID(updatedEntity);
      } else {
        setfromID(null);
      }
    }
  }, [data, setfromID]);
  
  const handleGetById = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const id = Object.fromEntries(formData).id;

    const response = await fetchItemById(id);
    setfromID(response);
  };
  
  return (
    <>
      <h1>All {ENTITY_NAME}s</h1>
      <section>
          {loading ? (<p>fetching data...</p>) : ( 
              <Table 
                data={data}
                editableFields={editableFields}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
          )}
      </section>

      <h1>Add {ENTITY_NAME}</h1>
      <section>
        <CreateForm fields={fields} createItem={createItem}/>
      </section>

      <h1>Get {ENTITY_NAME} with id</h1>
      <section>
        <form onSubmit={handleGetById}>
          <label>
            ID: <input type="text" name="id" required />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {!fromID || fromID.status >= 400 ? null : (
          <Table 
            data={[fromID]}
            editableFields={editableFields}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        )}
      </section>
    </>
  );
}
