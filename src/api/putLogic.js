import { BACKEND_LINK } from "../lib/consts";

const putData = async (apiName, data, id) => {
  if (!data || !id) return null;

  const endpoint = `${BACKEND_LINK}/${apiName}/${id}`;

  try {
    const token = sessionStorage.getItem("authToken");
    const businessId = sessionStorage.getItem("BusinessId");
    
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
    console.log("PUT submitted: ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error submitting PUT data: ", error);
    return null;
  }
};

export default putData;
