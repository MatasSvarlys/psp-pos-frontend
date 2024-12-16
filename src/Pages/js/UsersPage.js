import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ENTITY_NAME = "user";

//thsese dont particularly need to be out here, but i think its good practice to have constants out of the export function
const editableFields = [
  { name: "name", type: "text" },
  { name: "role", type: "select", options: ["Employee", "SuperAdmin", "BusinessOwner"] },
  { name: "businessId", type: "text" },
];

const fields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Role", name: "role", type: "select", required: true, options: ["Employee", "SuperAdmin", "BusinessOwner"] },
  { label: "Password", name: "password", type: "password", required: true },
  { label: "Business ID", name: "businessId", type: "text", required: true },
];

export default function UsersPage() {
  const { data: users, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud(ENTITY_NAME+"s");  
  const [fromID, setfromID] = useState(null);
  
  //initial load
  useEffect(() => {
    fetchItems();
  }, []);

  //update fromID (if its not null) when users change
  useEffect(() => {
    if (fromID?.id) {
      const updatedUser = users.find((user) => user.id === fromID.id);
      if (updatedUser) {
        setfromID(updatedUser);
      } else {
        setfromID(null);
      }
    }
  }, [users, setfromID]);
  
  const handleGetById = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const id = Object.fromEntries(formData).id;

    const response = await fetchItemById(id);
    setfromID(response);
  };
  
  const handleDummySubmit = async () => {
    const dummyData = {
      name: 'Dummy User',
      email: 'dummy@example.com',
      role: 'Employee',
      businessId: '123e4567-e89b-12d3-a456-426614174001',
      password: 'aaa',
    };
    
    await createItem(dummyData); 
  };
  
  return (
    <>
    <button onClick={handleDummySubmit}>Submit Dummy Data</button>
      <h1>All {ENTITY_NAME}s</h1>
      <section>
          {loading ? (<p>fetching data...</p>) : ( 
              <Table 
                data={users}
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
