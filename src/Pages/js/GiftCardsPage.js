import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

//ENTITY NAME HERE HARD CODED INTO CRUD AND IS ONLY USED FOR VANITY
const ENTITY_NAME = "gift card";

//thsese dont particularly need to be out here, but i think its good practice to have constants out of the export function
const editableFields = [
  { name: "code", type: "text" },
  { name: "currentBalance", type: "decimal" },
  { name: "expiryDate", type: "datetime-local" },
  { name: "isActive", type: "checkbox" },
];
//TODO: figure out if is active is neccisary as an input here, maybe you wanna keep it as yes by default
const fields = [
  { label: "Code", name: "code", type: "text", required: true },
  { label: "Initial Balance", name: "initialBalance", type: "decimal", required: true },
  { label: "Expiry Date", name: "expiryDate", type: "datetime-local", required: true },
  { label: "Is Active", name: "isActive", type: "checkbox", required: false },
];

export default function GiftCardsPage() {
  const { data, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud("giftcards");  
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
