import { useEffect, useState } from "react";
import submitData from "./useSubmitData";
import fetchDataFromApi from "./useFetchData";

export default function UsersPage() {
    // const { data, error, loading, refresh } = useFetch("users");
    // const { response, submitError, loading: loadingSubmit, confirmSubmit } = useSubmitData({ from: "users" });
    const [displayData, setDisplayData] = useState([]); 
    const [waitForLoad, setWaitForLoad] = useState(false);
    
    useEffect(() => {
      const fetchUsers = async () => {
        setWaitForLoad(true);
        try {
          const resp = await fetchDataFromApi("users"); // Await the resolution of the promise
          setDisplayData(resp || []); // Ensure displayData is always an array
          console.log(resp);
        } catch (error) {
          console.error("Error fetching users:", error);
          setDisplayData([]); // Fallback to an empty array in case of error
        } finally {
          setWaitForLoad(false); // Ensure loading state is updated
        }
      };
    
      fetchUsers();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
  
    const response = await submitData("users", payload);
    handleResponse(response);
  };
  
  const handleResponse = (response) => {
    if (response) {
      setDisplayData((prev) => [...prev, response]); // Update state with the new response
    } else {
      console.error("Failed to submit data or received an invalid response.");
    }
  };
  
  const handleDummySubmit = async () => {
    const dummyData = {
      name: 'Dummy User',
      email: 'dummy@example.com',
      role: 'user',
      // Add other necessary fields 
    };
    const response = await submitData("users", dummyData); 
    handleResponse(response);
  };
  
  return (
    <>
    <button onClick={handleDummySubmit}>Submit Dummy Data</button>

      <h1>All Users</h1>
      <section>
          {waitForLoad ? (<p>hold up</p>) : ( 
              <ul>
              {
                displayData.map((user) => (
                    <li key={user.id}>
                    {user.name}, {user.email}, {user.role}
                  </li>
                ))}
            </ul>
          )}
      </section>

      <h1>Add User</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
            <input
              type="text"
              name="name"
              required
            />
          <br />
          <label>Email:</label>
            <input
              type="email"
              name="email"
              required
            />
          <br />
          <label>Role:</label>
            <input
              type="text"
              name="role"
              required
            />
          <br />
          <label>Password:</label>
            <input
              type="password"
              name="password"
              required
            />
          <br />
          <label>Business ID:</label>
            <input
              type="text"
              name="businessId"
              required
              />
            <input type="submit" value="Submit" />
          <br />
        </form>
      </section>
    </>
  );
}
