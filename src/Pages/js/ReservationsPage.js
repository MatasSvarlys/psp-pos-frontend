import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ENTITY_NAME = "reservation";

//thsese dont particularly need to be out here, but i think its good practice to have constants out of the export function

const editableFields = [
    { name: "appointmentTime", type: "text" },
    { name: "serviceId", type: "text" },
    { name: "employeeId", type: "text" },
    { name: "phoneNumber", type: "text" },
    { name: "email", type: "email" },
];
  
//TODO: maybe make the emploeeId by default your id 
const fields = [
    { label: "Customer Name", name: "customerName", type: "text", required: true },
    { label: "Appointment Time", name: "appointmentTime", type: "text", required: true },
    { label: "Service ID", name: "serviceId", type: "text", required: true },
    { label: "Employee ID", name: "employeeId", type: "text", required: true },
    { label: "Phone Number", name: "phoneNumber", type: "text", required: false },
    { label: "Email", name: "email", type: "email", required: true },
];
  
  

export default function ReservationsPage() {
  const { data: reservations, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud(ENTITY_NAME+"s");  
  const [fromID, setfromID] = useState(null);
  
  //initial load
  useEffect(() => {
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
