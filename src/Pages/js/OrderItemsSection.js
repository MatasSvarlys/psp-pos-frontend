import { useState, useEffect } from "react";
import useCrud from "../../api/useCrud";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";
import fetchDataFromApi from "../../api/fetchLogic";

export default function OrderItemsSection({order}) {
    const [serviceIDs, setServiceIDs] = useState([]);
    const [productIDs, setProductIDs] = useState([]);
    const [productVariationIDs, setProductVariationIDs] = useState([]);
    const [discountIDs, setDiscountIDs] = useState([]);

    const orderItemFields = [
        { label: "Product ID", name: "productId", type: "select", options: productIDs, required: false },
        { label: "Product Variation ID", name: "productVariationId", type: "select", options: productVariationIDs, required: false },
        { label: "Service ID", name: "serviceId", type: "select", options: serviceIDs, required: false },
        { label: "Quantity", name: "quantity", type: "number", required: true },
        { label: "Discount ID", name: "discountId", type: "select", options: discountIDs, required: false },
    ];
      
    const orderItemEditableFields = [
        { name: "productId",  type: "select", options: productIDs },
        { name: "variationId", type: "select", options: productVariationIDs },
        { name: "serviceId", type: "select", options: serviceIDs },
        { name: "quantity", type: "number" },
        { name: "discountId", type: "select", options: discountIDs },
    ];

  const {
    data: orderItemData,
    setData,
    loading: orderItemLoading,
    createItem: createOrderItem,
    deleteItem: deleteOrderItem,
    updateItem: updateOrderItem,
  } = useCrud(`orders/${order.id}/items`);

  useEffect(() => {
    setData(order.orderItems);

    const fetchAllEntityIDs = async (entityName, setFunc) => {
        try {
            const entity = await fetchDataFromApi(entityName);
            setFunc(entity.map((entity) => entity.id));
            if(entityName !== "products"){
              setFunc(prev => [...prev, ""]);
            }
        } catch (error) {
            console.error("Error fetching IDs:", error);
        }
    };
    fetchAllEntityIDs("services", setServiceIDs);
    fetchAllEntityIDs("products", setProductIDs);
    fetchAllEntityIDs("productvariation", setProductVariationIDs);
    fetchAllEntityIDs("discounts", setDiscountIDs);
  }, []);

  useEffect(() => {
    setData(order.orderItems);
  }, [order]);
  
  return (
    <div>
      <h2>Order Items for Order ID: {order.id}</h2>
      <section>
        <Table
            data={orderItemData}
            editableFields={orderItemEditableFields}
            updateItem={updateOrderItem}
            deleteItem={deleteOrderItem}
        />
        {order.refunds.length > 0 && 
        <>
            <h2>Refunds</h2>
            <Table
                data={order.refunds}
            />
        </>}
        {order.payments.length > 0 && 
        <>
            <h2>payments</h2>
            <Table
                data={order.payments}
            />
        </>}
      </section>
      <h3>Add Order Item</h3>
      <CreateForm fields={orderItemFields} createItem={createOrderItem} />
    </div>
  );
}
