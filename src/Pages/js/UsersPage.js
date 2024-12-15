import { useEffect, useState } from "react";
import useCrud from "../../api/useCrud";

//TODO: split it up into different objects if possible
export default function UsersPage() {
  const { data: users, loading, fetchItems, fetchItemById, createItem, deleteItem, updateItem, editingID, setEditingID } = useCrud("users");
  
  const [userFromID, setUserFromID] = useState(null);

  //initial load
  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const response = await createItem(payload);
  };
  
  const handleGetById = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const id = Object.fromEntries(formData).id;

    const response = await fetchItemById(id);
    setUserFromID(response);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    if (userFromID.id === id){
      setUserFromID(null);
    }
  };
  
  const handleEdit = (id) => {
    setEditingID(id);
  };

  const handleSave = async (e, id) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    const previousUserData = users.find((user) => user.id === id);
    const previousData = { businessId: previousUserData.businessId };

    const response = await updateItem(id, updatedData, previousData);
  };
  
  const handleDummySubmit = async () => {
    const dummyData = {
      name: 'Dummy User',
      email: 'dummy@example.com',
      role: 'Employee',
      businessId: '123e4567-e89b-12d3-a456-426614174001',
      password: 'aaa',
    };
    
    const response = await createItem(dummyData); 
  };
  
  return (
    <>
    <button onClick={handleDummySubmit}>Submit Dummy Data</button>

      <h1>All Users</h1>
      <section>
          {loading ? (<p>fetching data...</p>) : ( 
              <ul>
              {
                users.map((user) => (
                  <li key={user.id}>
                    {editingID === user.id ? (
                      <form onSubmit={(e) => handleSave(e, user.id)}>
                        <input type="text" defaultValue={user.name} name="name" placeholder="Name" />
                        {user.email}
                        <input type="text" defaultValue={user.role} name="role" placeholder="Role" />
                        
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingID(null)}>Cancel</button>
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
            userFromID.status >= 400 ? (
              <p>User not found.</p> //show when userFromID is an empty object
            ) : (
              editingID === userFromID.id ? (
                <form onSubmit={(e) => handleSave(e, userFromID.id)} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <label>Name: <input type="text" defaultValue={userFromID.name} name="name" placeholder="Name" required /></label>
                  {userFromID.email}
                  <label>Role: <input type="text" defaultValue={userFromID.role} name="role" placeholder="Role" required /></label>

                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingID(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <p>{userFromID.name}, {userFromID.email}, {userFromID.role}</p>
                  <button onClick={() => handleEdit(userFromID.id)}>Update</button>
                  <button onClick={() => handleDelete(userFromID.id)}>Delete</button>
                </>
              )
            )
          ) : (
            <></> //show nothing when userFromID is null or undefined
          )}
      </section>

    </>
  );
}
