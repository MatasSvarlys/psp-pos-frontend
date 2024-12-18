import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const orderFields = [
  { label: "Business Name", name: "businessName", type: "text", required: true },
  { label: "Status", name: "status", type: "text", required: true },
];

const orderEditableFields = [
  { name: "businessName", type: "text" },
  { name: "status", type: "text" },
];

export default function OrdersSection({ onSelectOrder }) {
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
    const selected = orderData.find((order) => order.id === id);
    setSelectedOrder(selected);
    onSelectOrder(id);
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
        <div>
          <h3>Order Details for {selectedOrder.businessName}</h3>

          {selectedOrder.orderItems.length > 0 ? (
            <div>
              <h4>Order Items</h4>
              <ul>
                {selectedOrder.orderItems.map((item) => (
                  <li key={item.id}>
                    Product: {item.productName}, Quantity: {item.quantity}, Price: {item.price}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No order items available.</p>
          )}

          {selectedOrder.payments.length > 0 ? (
            <div>
              <h4>Payments</h4>
              <ul>
                {selectedOrder.payments.map((payment) => (
                  <li key={payment.id}>
                    Amount: {payment.amount}, Method: {payment.paymentMethod}, Status: {payment.status}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No payments available.</p>
          )}

          {selectedOrder.refunds.length > 0 ? (
            <div>
              <h4>Refunds</h4>
              <ul>
                {selectedOrder.refunds.map((refund) => (
                  <li key={refund.id}>
                    Amount: {refund.amount}, Reason: {refund.refundReason}, Status: {refund.refundStatus}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No refunds available.</p>
          )}
        </div>
      )}

      <h3>Add Order</h3>
      <CreateForm fields={orderFields} createItem={createOrder} />
    </div>
  );
}
