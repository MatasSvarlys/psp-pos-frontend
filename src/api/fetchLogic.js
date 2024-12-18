import { BACKEND_LINK } from "../lib/consts";

const fetchDataFromApi = async (urlEnd, id=null) => {
  try {
    //TODO: move the token and businessID out to useCrud so it doesnt repeat in every smaller one
    const token = localStorage.getItem("authToken");
    const businessId = localStorage.getItem("BusinessId");

    const fetchLink = id ? `${BACKEND_LINK}/${urlEnd}/${id}` : `${BACKEND_LINK}/${urlEnd}`;
    const response = await fetch(fetchLink, {
      headers: { 
        Authorization: `Bearer ${token}`,
        BusinessId: businessId
      }
    });
    const data = await response.json();

    console.log("fetched: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export default fetchDataFromApi;
