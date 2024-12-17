import { useEffect } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ENTITY_NAME = "paymentprovider";

const paymentProviderFields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Type", name: "type", type: "text", required: true },
  { label: "External ID", name: "externalId", type: "text", required: true },
  { label: "API Secret", name: "apiSecret", type: "text", required: true },
  { label: "Webhook Secret", name: "webhookSecret", type: "text", required: true },
  { label: "Is Active", name: "isActive", type: "checkbox", required: true }
];

const paymentProviderEditableFields = [
  { name: "name", type: "text" },
  { name: "type", type: "text" },
  { name: "externalId", type: "text" },
  { name: "apiSecret", type: "text" },
  { name: "webhookSecret", type: "text" },
  { name: "isActive", type: "checkbox" }
];

export default function PaymentProviders() {
  const { data: paymentProviderData, loading: paymentProviderLoading, fetchItems: fetchPaymentProviders, createItem: createPaymentProvider, deleteItem: deletePaymentProvider, updateItem: updatePaymentProvider } = useCrud(ENTITY_NAME + "s");

  useEffect(() => {
    fetchPaymentProviders();
  }, []);

  return (
    <>
      <h2>All Payment Providers</h2>
      <section>
        {paymentProviderLoading ? (
          <p>Fetching payment providers...</p>
        ) : (
          <Table data={paymentProviderData} editableFields={paymentProviderEditableFields} updateItem={updatePaymentProvider} deleteItem={deletePaymentProvider} />
        )}
      </section>

      <h2>Add Payment Provider</h2>
      <section>
        <CreateForm fields={paymentProviderFields} createItem={createPaymentProvider} />
      </section>
    </>
  );
}
