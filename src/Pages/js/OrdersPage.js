import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

const ORDER_ENTITY_NAME = "order";
const ORDER_ITEM_ENTITY_NAME = "orderitem";

// Order Fields (Create and Update)
const orderFields = [
  { label: "User ID", name: "userId", type: "text", required: true },
  { label: "Business ID", name: "businessId", type: "text", required: true }
];

const orderEditableFields = [
  { name: "userId", type: "text" },
  { name: "businessId", type: "text" }
];

// Order Item Fields (Create and Update)
const orderItemFields = [
  { label: "Product ID", name: "productId", type: "text", required: false },
  { label: "Product Variation ID", name: "productVariationId", type: "text", required: false },
  { label: "Service ID", name: "serviceId", type: "text", required: false },
  { label: "Quantity", name: "quantity", type: "number", required: true },
  { label: "Discount ID", name: "discountId", type: "text", required: false }
];

const orderItemEditableFields = [
  { name: "productId", type: "text" },
  { name: "productVariationId", type: "text" },
  { name: "serviceId", type: "text" },
  { name: "quantity", type: "number" },
  { name: "discountId", type: "text" }
];

export default function OrdersPage() {
  const { data: orderData, loading: orderLoading, fetchItems: fetchOrders, fetchItemById: fetchOrderById, createItem: createOrder, deleteItem: deleteOrder, updateItem: updateOrder } = useCrud(ORDER_ENTITY_NAME + "s");
  const { data: orderItemData, loading: orderItemLoading, fetchItems: fetchOrderItems, fetchItemById: fetchOrderItemById, createItem: createOrderItem, deleteItem: deleteOrderItem, updateItem: updateOrderItem } = useCrud(ORDER_ITEM_ENTITY_NAME);
  const [fromID, setFromID] = useState(null);

  // Initial load for orders and order items
  useEffect(() => {
    fetchOrders();
    fetchOrderItems();
  }, []);

  // Update fromID (if it's not null) when data changes
  useEffect(() => {
    if (fromID?.id) {
      const updatedOrder = orderData.find((entity) => entity.id === fromID.id);
      if (updatedOrder) {
        setFromID(updatedOrder);
      } else {
        setFromID(null);
      }
    }
  }, [orderData, setFromID]);

  const handleGetById = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const id = Object.fromEntries(formData).id;

    const response = await fetchOrderById(id);
    setFromID(response);
  };

  return (
    <>
      <h1>All Orders</h1>
      <section>
        {orderLoading ? (
          <p>Fetching orders...</p>
        ) : (
          <Table data={orderData} editableFields={orderEditableFields} updateItem={updateOrder} deleteItem={deleteOrder} />
        )}
      </section>

      <h1>Add Order</h1>
      <section>
        <CreateForm fields={orderFields} createItem={createOrder} />
      </section>

      <h1>Get Order by ID</h1>
      <section>
        <form onSubmit={handleGetById}>
          <label>
            ID: <input type="text" name="id" required />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {!fromID || fromID.status >= 400 ? null : (
          <Table data={[fromID]} editableFields={orderEditableFields} updateItem={updateOrder} deleteItem={deleteOrder} />
        )}
      </section>

      <h1>All Order Items</h1>
      <section>
        {orderItemLoading ? (
          <p>Fetching order items...</p>
        ) : (
          <Table data={orderItemData} editableFields={orderItemEditableFields} updateItem={updateOrderItem} deleteItem={deleteOrderItem} />
        )}
      </section>

      <h1>Add Order Item</h1>
      <section>
        <CreateForm fields={orderItemFields} createItem={createOrderItem} />
      </section>
    </>
  );
}
