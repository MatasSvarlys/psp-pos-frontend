import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ENTITY_NAME = "business";

//thsese dont particularly need to be out here, but i think its good practice to have constants out of the export function
const editableFields = [
    { name: "name", type: "text" },
    { name: "owner", type: "text" },
    { name: "email", type: "email" },
    { name: "phoneNumber", type: "text" },
    { name: "startHour", type: "number" },
    { name: "endHour", type: "number" },
  ];
  
  const fields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Owner", name: "owner", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Phone Number", name: "phoneNumber", type: "text", required: false },
    { label: "Opening hour", name: "startHour", type: "number", required: true  },
    { label: "Closing hour", name: "endHour", type: "number", required: true  },
  ];
  

export default function BusinessesPage() {
  const { data: businesses, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud(ENTITY_NAME+"es");  
  const [fromID, setfromID] = useState(null);
  
  //initial load
  useEffect(() => {
    fetchItems();
  }, []);

  //update fromID (if its not null) when businesses change
  useEffect(() => {
    if (fromID?.id) {
      const updatedBusiness = businesses.find((user) => user.id === fromID.id);
      if (updatedBusiness) {
        setfromID(updatedBusiness);
      } else {
        setfromID(null);
      }
    }
  }, [businesses, setfromID]);
  
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
                data={businesses}
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
