import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import fetchDataFromApi from "../../api/fetchLogic";

const ENTITY_NAME = "service";

//thsese dont particularly need to be out here, but i think its good practice to have constants out of the export function
const editableFields = [
    { name: "name", type: "text" },
    { name: "category", type: "text" },
    { name: "price", type: "number" },
    { name: "durationMin", type: "number" },
    { name: "description", type: "text" },
  ];
  
  
  
  export default function ServicesPage() {
    const { data: services, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud(ENTITY_NAME+"s");  
    const [fromID, setfromID] = useState(null);
    const [taxIDs, setTaxIDs] = useState([]);
    const fields = [
      { label: "Name", name: "name", type: "text", required: true },
      { label: "Category", name: "category", type: "text", required: true },
      { label: "Price", name: "price", type: "decimal", required: true },
      { label: "Duration (Min)", name: "durationMin", type: "number", required: true },
      { label: "Business ID", name: "businessId", type: "text", required: true },
      { label: "Tax ID", name: "taxId", type: "select", options: taxIDs, required: true },
      { label: "Description", name: "description", type: "text", required: false },
    ];
  //initial load
  useEffect(() => {
    const fetchAllEntityIDs = async (entityName, setFunc) => {
      try {
        const entity = await fetchDataFromApi(entityName);
        setFunc(entity.map((entity) => entity.id));
      } catch (error) {
        console.error("Error fetching IDs:", error);
      }
    };
    fetchAllEntityIDs("taxes", setTaxIDs);
    fetchItems();
  }, []);

  //update fromID (if its not null) when services change
  useEffect(() => {
    if (fromID?.id) {
      const updatedService = services.find((user) => user.id === fromID.id);
      if (updatedService) {
        setfromID(updatedService);
      } else {
        setfromID(null);
      }
    }
  }, [services, setfromID]);
  
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
                data={services}
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
