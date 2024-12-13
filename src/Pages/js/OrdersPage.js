import React, { useEffect, useState } from "react";
export default function OrdersPage() {
  const [orders, setOrders] = useState(null);


  //TODO: make it so the CreateForm is behind a button (optional)
  //TODO: add auth so that only specified users can create/update/delete orders 
  return (
    <div className='table-container'>
        {/* <CreateForm headers={headers} requiredFields={requiredFields} onSubmit={handleSubmit}/> */}
      {/* {orders.length === 0 ? ( */}
        <h1>No Orders Found</h1>
      {/* ) : ( */}
        {/* // <Table headers={headers} data={orders} /> */}
      {/* )} */}
    </div>
  );
}
