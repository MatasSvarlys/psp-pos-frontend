import React, { useState } from "react";
import Table from "../../Common-elements/js/Table";
import CreateForm from "../../Common-elements/js/CreateForm";

export default function OrdersPage() {
  //TODO: add fetching initial data from the backend
  const [orders, setOrders] = useState([
    {id: 1, name: "crabby patty", quantity: 1},
    {id: 2, name: "crabby patty the better", quantity: 5}
  ]);

  const headers = ["ID", "Name", "Quantity"];
  const requiredFields = ["Name"];

  const handleSubmit = (formData) => {
    var requestLink = 'http://localhost:5000/Api/Order';

    try {
      fetch(requestLink, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), //the data passed should be in correct forma already
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); //TODO: check if maybe this needs to call a refresh function too
      })
      .then(result => {
          console.log('Order submitted successfully:', result);
      })
      .catch(error => {
          console.error('Error submitting order:', error);
      });
    } catch (error) {
        console.error('Unexpected error:', error);
    }

    console.log("handling submit form");
  }

  //TODO: add a loading element while fetching
  //TODO: make it so the CreateForm is behind a button (optional)
  //TODO: add a refresh button
  //TODO: add auth so that only specified users can create/update/delete orders 
  return (
    <div className='table-container'>
        <CreateForm headers={headers} requiredFields={requiredFields} onSubmit={handleSubmit}/>
      {orders.length === 0 ? (
        <h1>No Orders Found</h1>
      ) : (
        <Table headers={headers} data={orders} />
      )}
    </div>
  );
}
