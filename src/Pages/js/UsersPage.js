import { useEffect, useState } from "react";
import submitData from "../../api/postLogic";
import fetchDataFromApi from "../../api/fetchLogic";
import deleteData from "../../api/deleteLogic";
import putData from "../../api/putLogic";

//TODO: split it up into different objects if possible
export default function UsersPage() {
  const [displayData, setDisplayData] = useState([]); 
  const [waitForLoad, setWaitForLoad] = useState(false);
  //i could have 2 of these for editing from the whole list and editing from the fetched by id but i cant be bothered
  const [editingUserId, setEditingUserId] = useState(null);
  const [userFromID, setUserFromID] = useState(null);

  //initial load
  //i know there are ways to cash this so it doesnt refetch or reload, but i wanna learn the og way so 
  useEffect(() => {
    const fetchUsers = async () => {
      setWaitForLoad(true);
      try {
        const resp = await fetchDataFromApi("users");
        setDisplayData(resp || []);
        console.log(resp);
      } finally {
        setWaitForLoad(false);
      }
    };
  
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const response = await submitData("users", payload);
    
    if (!response || response.status >= 400) {
      console.error("Invalid request parameters: ", response);
      return;
    }
    setDisplayData((prev) => [...prev, response]);
    
  };
  
  const handleGetById = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const id = Object.fromEntries(formData).id;
    console.log("id: "+id);
    const response = await fetchDataFromApi("users", id);
    if (!response || response.status >= 400) {
      console.error("Invalid request parameters: ", response);
      setEditingUserId(null);
      return;
    }
    setUserFromID(response);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const response = await deleteData("users", id);
      console.log("User deleted successfully:", response.id);
      if (!response || response.status >= 400) {
        console.error("Invalid request parameters: ", response);
        setEditingUserId(null);
        return;
      }
      setDisplayData((prevData) => prevData.filter((user) => user.id !== id));
    }
  };
  
  const handleEdit = (id) => {
    setEditingUserId(id);
  };

  const handleSave = async (e, id) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    const previousUserData = displayData.find((user) => user.id === id);
  
    const mergedData = { 
      ...previousUserData, 
      ...updatedData
    };

    const response = await putData("users", mergedData, id);
    //TODO: maybe theres a way to shorten this cus it repeats everywhere
    if (!response || response.status >= 400) {
      console.error("Invalid request parameters: ", response);
      setEditingUserId(null);
      return;
    }
    setDisplayData((prev) =>
      prev.map((user) => (user.id === id ? response : user))
    );

    setEditingUserId(null);
  };
  
  const handleDummySubmit = async () => {
    const dummyData = {
      name: 'Dummy User',
      email: 'dummy@example.com',
      role: 'Employee',
      businessId: '123e4567-e89b-12d3-a456-426614174001',
      password: 'aaa',
    };
    
    const response = await submitData("users", dummyData); 
    if (!response || response.status >= 400) {
      console.error("Invalid request parameters: ", response);
      return;
    }
    setDisplayData((prev) => [...prev, response]);
  };
  
  return (
    <>
    <button onClick={handleDummySubmit}>Submit Dummy Data</button>

      <h1>All Users</h1>
      <section>
          {waitForLoad ? (<p>fetching data...</p>) : ( 
              <ul>
              {
                displayData.map((user) => (
                  <li key={user.id}>
                    {editingUserId === user.id ? (
                      <form onSubmit={(e) => handleSave(e, user.id)}>
                        <input type="text" defaultValue={user.name} name="name" placeholder="Name" />
                        <input type="email" defaultValue={user.email} name="email" placeholder="Email" />
                        <input type="text" defaultValue={user.role} name="role" placeholder="Role" />
                        <input type="text" name="password" placeholder="Password" />
                        
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingUserId(null)}>Cancel</button>
                      </form>
                    ) : (
                      <>
                        {user.name}, {user.email}, {user.role}
                        <button onClick={() => handleEdit(user.id)}>Update</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                      </>
                    )}
                  </li>
                ))}
            </ul>
          )}
      </section>

      <h1>Add User</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <label>Name: <input type="text" name="name" required /></label>
          <label>Email: <input type="email" name="email" required /></label>
          <label>Role: <input type="text" name="role" required /></label>
          <label>Password: <input type="password" name="password" required /></label>
          <label>Business ID: <input type="text" name="businessId" required /></label>
          <input type="submit" value="Submit" />
        </form>
      </section>

      <h1>Get user with id</h1>
      <section>
        <form onSubmit={handleGetById}>
          <label>
            ID: <input type="text" name="id" required />
          </label>
          <input type="submit" value="Submit" />
        </form>
          {userFromID ? (
            Object.keys(userFromID).length > 0 ? (
              editingUserId === userFromID.id ? (
                <form onSubmit={(e) => handleSave(e, userFromID.id)} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <label>Name: <input type="text" defaultValue={userFromID.name} name="name" placeholder="Name" required /></label>
                  <label>Email: <input type="email" defaultValue={userFromID.email} name="email" placeholder="Email" required /></label>
                  <label>Role: <input type="text" defaultValue={userFromID.role} name="role" placeholder="Role" required /></label>

                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingUserId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <p>{userFromID.name}, {userFromID.email}, {userFromID.role}</p>
                  <button onClick={() => handleEdit(userFromID.id)}>Update</button>
                  <button onClick={() => handleDelete(userFromID.id)}>Delete</button>
                </>
              )
            ) : (
              <p>User not found.</p> //show when userFromID is an empty object
            )
          ) : (
            <></> //show nothing when userFromID is null or undefined
          )}
      </section>

    </>
  );
}
