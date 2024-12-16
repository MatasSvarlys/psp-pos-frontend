import { useState } from "react";
import submitData from "./postLogic.js";
import fetchDataFromApi from "./fetchLogic.js";
import deleteData from "./deleteLogic.js";
import putData from "./putLogic.js"

const useCrud = (entity) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const createItem = async (payload) => {
    const response = await submitData(entity, payload);
    if (!response || response.status >= 400) {
        window.alert(JSON.stringify(response));
        return;
    }
    setData((prev) => [...prev, response]); 
    return response;
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetchDataFromApi(entity);
      setData(response || []);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const fetchItemById = async (id) => {
    const response = await fetchDataFromApi(entity, id);
    if (!response || response.status >= 400) {
      window.alert(JSON.stringify(response));
      return;
    }
    return response;
  };

  const deleteItem = async (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete this ${entity}?`);
    if (confirmed) {
      const response = await deleteData(entity, id);
      if (!response || response.status >= 400) {
        window.alert(JSON.stringify(response));
        return;
      }
      console.log(`${entity} deleted successfully:`, response.id);
      setData((prevData) => prevData.filter((user) => user.id !== id));
      
    }
  };

  const updateItem = async (id, updatedData, previousData = {}) => {
    const mergedData = { ...updatedData, ...previousData };
    const response = await putData(entity, mergedData, id);
    if (!response || response.status >= 400) {
        window.alert(JSON.stringify(response));
        return;
    }
    console.log(`${entity} updated successfully:`, response.id);
    setData((prev) => prev.map((item) => (item.id === id ? response : item)));
    return response;
  };

  return {
    data,
    setData,
    loading,
    createItem,
    fetchItems,
    fetchItemById,
    deleteItem,
    updateItem,
  };
};

export default useCrud;