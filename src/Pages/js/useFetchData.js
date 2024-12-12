const fetchDataFromApi = async (urlEnd) => {
  try {
    const response = await fetch(`http://localhost:5000/${urlEnd}`);
    const data = await response.json();
    console.log("fetched: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export default fetchDataFromApi;
