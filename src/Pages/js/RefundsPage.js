import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import fetchDataFromApi from "../../api/fetchLogic";

const ENTITY_NAME = "refund";

export default function RerfundsPage() {  
  const { data, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem } = useCrud(ENTITY_NAME+"s");  
  const [fromID, setfromID] = useState(null);
  const [OrderIDs, setOrderIDs] = useState([]);
  const [PaymentIDs, setPaymentIDs] = useState([]);
  
  const fields = [
    { label: "Order Id", name: "orderId", type: "select", options: OrderIDs, required: true },
    { label: "Payment Id", name: "paymentId", type: "select", options: PaymentIDs, required: true },
    { label: "Amount", name: "amount", type: "decimal", required: true },
    { label: "End Date", name: "endDate", type: "datetime-local", required: false },
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
    fetchAllEntityIDs("orders", setOrderIDs);
    fetchAllEntityIDs("payments", setPaymentIDs);
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
            deleteItem={deleteItem}
          />
        )}
      </section>
    </>
  );
}
