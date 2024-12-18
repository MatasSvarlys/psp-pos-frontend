import { BACKEND_LINK } from "../lib/consts";

const putData = async (apiName, data, id) => {
  if (!data || !id) return null;

  const endpoint = `${BACKEND_LINK}/${apiName}/${id}`;

  try {
    const token = localStorage.getItem("authToken");
    const businessId = localStorage.getItem("BusinessId");
    
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        BusinessId: businessId
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log(`PUT (${endpoint}) resp: `, JSON.stringify(responseData), "\n\nbody: ", JSON.stringify(data));
    return responseData;
  } catch (error) {
    console.error("Error submitting PUT data: ", error);
    return null;
  }
};

export default putData;
