import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import OrderItemsSection from "./OrderItemsSection";
import fetchDataFromApi from "../../api/fetchLogic";


export default function OrdersPage() {
  const [discountIDs, setDiscountIDs] = useState([]);
  const orderEditableFields = [
    { name: "discountId", type: "select", options: discountIDs },
  ];
  const orderFields = [
    { label: "Discount ID", name: "discountId", type: "select", options: discountIDs, required: false },
  ];

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
    const fetchAllEntityIDs = async (entityName, setFunc) => {
      try {
        const entity = await fetchDataFromApi(entityName);
        setFunc(entity.map((entity) => entity.id));
        setFunc(prev => [...prev, ""]);
      } catch (error) {
        console.error("Error fetching IDs:", error);
      }
    };
    fetchAllEntityIDs("discounts", setDiscountIDs);
    fetchOrders();
  }, []);

  // Handle order selection
  const handleRowSelect = (id) => {
    const selected = orderData.find((order) => order.id  === id);
    setSelectedOrder(selected);
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
