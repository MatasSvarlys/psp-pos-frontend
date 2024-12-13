import { BACKEND_LINK } from "../lib/consts";

const fetchDataFromApi = async (urlEnd, id=null) => {
  try {
    const fetchLink = id ? `${BACKEND_LINK}/${urlEnd}/${id}` : `${BACKEND_LINK}/${urlEnd}`;
    const response = await fetch(fetchLink);
    const data = await response.json();

    console.log("fetched: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export default fetchDataFromApi;
