import { BACKEND_LINK } from "../lib/consts";

const postData = async (apiName, data) => {
  if (!data) return null;

  const endpoint = `${BACKEND_LINK}/${apiName}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log("POST submitted: ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error submitting POST data: ", error);
    return null;
  }
};

export default postData;
