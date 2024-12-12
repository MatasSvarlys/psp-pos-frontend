import React, { useEffect, useState } from "react";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);


  //TODO: add a loading element while fetching
  //TODO: make it so the CreateForm is behind a button (optional)
  //TODO: add a refresh button
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
