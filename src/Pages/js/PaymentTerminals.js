import { useState, useEffect } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import fetchDataFromApi from "../../api/fetchLogic";

const ENTITY_NAME = "paymentterminal";


export default function PaymentTerminals() {
  const { data: paymentTerminalData, loading: paymentTerminalLoading, fetchItems: fetchPaymentTerminals, createItem: createPaymentTerminal, deleteItem: deletePaymentTerminal, updateItem: updatePaymentTerminal } = useCrud(ENTITY_NAME + "s");
  const [PaymentProviderIDs, setPaymentProviderIDs] = useState([]);
  const paymentTerminalFields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "External ID", name: "externalId", type: "text", required: true },
    { label: "Payment Provider ID", name: "paymentProviderId", type: "select", options: PaymentProviderIDs, required: true },
    { label: "Is Active", name: "isActive", type: "checkbox", required: true }
  ];
  
  const paymentTerminalEditableFields = [
    { name: "name", type: "text" },
    { name: "externalId", type: "text" },
    { name: "paymentProviderId", type: "text" },
    { name: "isActive", type: "checkbox" }
  ];

  useEffect(() => {
    const fetchAllEntityIDs = async (entityName, setFunc) => {
      try {
        const entity = await fetchDataFromApi(entityName);
        setFunc(entity.map((entity) => entity.id));
      } catch (error) {
        console.error("Error fetching IDs:", error);
      }
    };
    fetchAllEntityIDs("paymentproviders", setPaymentProviderIDs);

    fetchPaymentTerminals();
  }, []);

  return (
    <>
      <h2>All Payment Terminals</h2>
      <section>
        {paymentTerminalLoading ? (
          <p>Fetching payment terminals...</p>
        ) : (
          <Table data={paymentTerminalData} editableFields={paymentTerminalEditableFields} updateItem={updatePaymentTerminal} deleteItem={deletePaymentTerminal} />
        )}
      </section>

      <h2>Add Payment Terminal</h2>
      <section>
        <CreateForm fields={paymentTerminalFields} createItem={createPaymentTerminal} />
      </section>
    </>
  );
}
