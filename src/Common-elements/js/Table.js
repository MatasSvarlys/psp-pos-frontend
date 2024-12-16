import { useState } from "react";

const Table = ({ data, editableFields, updateItem, deleteItem }) => {
  const [editingID, setEditingID] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const handleEdit = (id) => {
    setEditingID(id);
    const rowToEdit = data.find((row) => row.id === id);
    setEditedRow({ ...rowToEdit }); // Initialize editing with the current row data
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (id) => {
    await updateItem(id, editedRow);
    setEditingID(null); 
    setEditedRow({});
  };

  const headers = Object.keys(data[0] || {}).filter((header) => header !== "isDeleted");

  const renderEditableCell = (field, value) => {
    const config = editableFields.find((f) => f.name === field);

    if (config?.type === "select") {
      return (
        <select
          name={field}
          value={editedRow[field] || value}
          onChange={handleChange}
          required
        >
          {config.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        name={field}
        value={editedRow[field] || value}
        onChange={handleChange}
        type={config?.type || "text"}
        required
      />
    );
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {headers.map((header) => (
              <td key={header}>
                {editingID === row.id && editableFields.some((f) => f.name === header) ? (
                  renderEditableCell(header, row[header])
                ) : (
                  row[header] || "-"
                )}
              </td>
            ))}
            <td>
              {editingID === row.id ? (
                <>
                  <button type="button" onClick={() => handleSave(row.id)}>
                    Save
                  </button>
                  <button type="button" onClick={() => setEditingID(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => handleEdit(row.id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(row.id)}>
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
