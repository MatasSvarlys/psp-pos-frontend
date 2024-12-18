import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import OrderItemsSection from "./OrderItemsSection";

const orderFields = [
  { label: "Business Name", name: "businessName", type: "text", required: true },
  { label: "Status", name: "status", type: "text", required: true },
];

const orderEditableFields = [
  { name: "businessName", type: "text" },
  { name: "status", type: "text" },
];

export default function OrdersPage() {

  const {
    data: orderData,
    loading: orderLoading,
    fetchItems: fetchOrders,
    createItem: createOrder,
    deleteItem: deleteOrder,
    updateItem: updateOrder,
  } = useCrud("orders");

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders on load
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle order selection
  const handleRowSelect = (id) => {
    const selected = orderData.find((order) => order.id  === id);
    setSelectedOrder(selected);
    // console.log("selected order"+JSON.stringify(selected)+"\n\n"+selected.id);
  };

  return (
    <div>
      <h2>Orders</h2>
      <section>
        {orderLoading ? (
          <p>Loading orders...</p>
        ) : (
          <Table
            data={orderData.map(({ orderItems, payments, refunds, ...mainData }) => mainData)}
            editableFields={orderEditableFields}
            updateItem={updateOrder}
            deleteItem={deleteOrder}
            onRowSelect={handleRowSelect}
          />
        )}
      </section>

      {selectedOrder && (
        <OrderItemsSection order={selectedOrder} />
      )}

      <h3>Add Order</h3>
      <CreateForm fields={orderFields} createItem={createOrder} />
    </div>
  );
}
