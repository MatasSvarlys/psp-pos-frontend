const submitData = async (apiName, data, id = null) => {
  if (!data) return null;

  const method = id ? "PUT" : "POST";
  // TODO: re-add the /Api when not using mock server
  const endpoint = id
    ? `http://localhost:5000/${apiName}/${id}`
    : `http://localhost:5000/${apiName}`;

  try {
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    console.log("submitted: ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error submitting data: ", error);
    return null; // Handle the error as needed
  }
};

export default submitData;
