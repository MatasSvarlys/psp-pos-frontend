import { BACKEND_LINK } from "../lib/consts";

const postData = async (apiName, data) => {
  if (!data) return null;
  
  const endpoint = `${BACKEND_LINK}/${apiName}`;
  
  try {
    const token = sessionStorage.getItem("authToken");
    const businessId = sessionStorage.getItem("BusinessId");

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        BusinessId: businessId
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log("POST submitted:\n\nResp: ", JSON.stringify(responseData)+"\n\nbody: "+ JSON.stringify(data));
    return responseData;
  } catch (error) {
    console.error("Error submitting POST data: ", error);
    return null;
  }
};

export default postData;
