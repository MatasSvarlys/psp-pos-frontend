import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import fetchDataFromApi from "../../api/fetchLogic";

const ENTITY_NAME = "reservation";

export default function ReservationsPage() {
  const { data: reservations, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud(ENTITY_NAME+"s");  
  const [fromID, setfromID] = useState(null);
  const [employeeIds, setEmployeeId] = useState([]);
  const [serviceIds, setServiceId] = useState([]);
  const editableFields = [
      { name: "appointmentTime", type: "text" },
      { name: "serviceId", type: "select", options: serviceIds },
      { name: "employeeId", type: "select", options: employeeIds },
      { name: "phoneNumber", type: "text" },
      { name: "email", type: "email" },
  ];
    
  //TODO: maybe make the emploeeId by default your id 
  const fields = [
      { label: "Customer Name", name: "customerName", type: "text", required: true },
      { label: "Appointment Time", name: "appointmentTime", type: "text", required: true },
      { label: "Service ID", name: "serviceId", type: "select", options: serviceIds, required: true },
      { label: "Employee ID", name: "employeeId", type: "select", options: employeeIds, required: true },
      { label: "Phone Number", name: "phoneNumber", type: "text", required: false },
      { label: "Email", name: "email", type: "email", required: true },
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
    fetchAllEntityIDs("services", setServiceId);
    //TODO: send your id instead of letting you chose
    fetchAllEntityIDs("users", setEmployeeId);
    fetchItems();
  }, []);

  //update fromID (if its not null) when reservations change
  useEffect(() => {
    if (fromID?.id) {
      const updatedReservations = reservations.find((user) => user.id === fromID.id);
      if (updatedReservations) {
        setfromID(updatedReservations);
      } else {
        setfromID(null);
      }
    }
  }, [reservations, setfromID]);
  
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
                data={reservations}
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
