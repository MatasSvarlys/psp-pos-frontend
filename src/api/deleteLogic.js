import { BACKEND_LINK } from "../lib/consts";

const deleteData = async (apiName, id) => {
  if (!id) return null;

  const endpoint = `${BACKEND_LINK}/${apiName}/${id}`;

  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete resource with ID: ${id}`);
    }

    console.log(`Deleted resource with ID: ${id}`);
    return { success: true, id };
  } catch (error) {
    console.error("Error deleting data: ", error);
    return null;
  }
};

export default deleteData;
