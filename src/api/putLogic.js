import { BACKEND_LINK } from "../lib/consts";

const putData = async (apiName, data, id) => {
  if (!data || !id) return null;

  const endpoint = `${BACKEND_LINK}/${apiName}/${id}`;

  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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
