import { useEffect } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ENTITY_NAME = "payment";

const paymentFields = [
  { label: "Order ID", name: "orderId", type: "text", required: true },
  { label: "Amount", name: "amount", type: "decimal", required: true },
  { label: "Payment Method", name: "paymentMethod", type: "text", required: true },
  { label: "Gift Card Code", name: "giftCardCode", type: "text", required: false },
  { label: "Tip", name: "tip", type: "decimal", required: false },
  { label: "Payment Terminal ID", name: "paymentTerminalId", type: "text", required: false }
];

export default function Payments() {
  const { data: paymentData, loading: paymentLoading, fetchItems: fetchPayments, createItem: createPayment, deleteItem: deletePayment, updateItem: updatePayment } = useCrud(ENTITY_NAME + "s");

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <h2>All Payments</h2>
      <section>
        {paymentLoading ? (
          <p>Fetching payments...</p>
        ) : (
          <Table data={paymentData} deleteItem={deletePayment} />
        )}
      </section>

      <h2>Add Payment</h2>
      <section>
        <CreateForm fields={paymentFields} createItem={createPayment} />
      </section>
    </>
  );
}
