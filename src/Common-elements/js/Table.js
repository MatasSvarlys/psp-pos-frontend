import { useState } from "react";
import "../css/Table.css";

const Table = ({ data, editableFields = null, updateItem = null, deleteItem=null, onRowSelect = null }) => {
  const formatDateTimeForDisplay = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    const out = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log(out);
    return out;
  };
  
  const formatDateTimeForSending = (value) => {
    const date = new Date(value);
    const out = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return out;
  };
    
  const sanitizePayload = (payload, fields) => {

    return fields.reduce((acc, field) => {
      const key = field.name;
      const value = payload[key];

      switch (field.type) {
        case "number":
        case "decimal":
          acc[key] = value === undefined || value === "" ? null : value;
          break;
        case "datetime-local":
          acc[key] = value === undefined || value === "" ? null : formatDateTimeForSending(value);
          break;
        case "checkbox":
          acc[key] = value === "on" ? true : false;
          break;
        default:
          acc[key] = value !== undefined ? value : "";
          acc[key] = value !== '' ? value : null;
          break;
      }

      return acc;
    }, {});
  };


  const [editingID, setEditingID] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const handleEdit = (id) => {
    setEditingID(id);
    const rowToEdit = data.find((row) => row.id === id);
    setEditedRow({ ...rowToEdit });
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const rawInput = { [name]: type === "checkbox" ? (checked ? "on" : "") : value };

    const sanitizedInput = sanitizePayload(
      { ...editedRow, [name]: rawInput[name] },
      editableFields
    );

    setEditedRow((prev) => ({
      ...prev,
      ...sanitizedInput,
    }));
  };

  const handleSave = async (id) => {
    const sanitizedPayload = sanitizePayload(editedRow, editableFields);

    editableFields.forEach((field) => {
      if ((field.type === "number" || field.type === "decimal") && sanitizedPayload[field.name] !== null) {
        sanitizedPayload[field.name] = Number(sanitizedPayload[field.name]);
      }
    });

    await updateItem(id, sanitizedPayload);
    setEditingID(null);
    setEditedRow({});
  };

  const headers = Object.keys(data[0] || {}).filter((header) => header !== "isDeleted");

  const renderEditableCell = (field, value) => {
    const config = editableFields.find((f) => f.name === field);
    const fieldType = config?.type;

    switch (fieldType) {
      case "select":
        return (
          <select
            name={field}
            value={editedRow[field] || value || ""}
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
  
      case "datetime-local":
        const dateValue = editedRow[field] || value;
        const formattedValue = dateValue ? formatDateTimeForDisplay(dateValue) : "";
        return (
          <input
            name={field}
            type="datetime-local"
            value={formattedValue}
            onChange={handleChange}
            required
          />
        );
  
      case "decimal":
        return (
          <input
            name={field}
            type="number"
            step="0.01"
            value={editedRow[field] || value}
            onChange={handleChange}
            required
          />
        );
  
      default:
        return (
          <input
            name={field}
            value={editedRow[field] || value}
            onChange={handleChange}
            type={fieldType || "text"}
            required
          />
        );
    }
  };

  return (
    <div className="table-container">
      {data.length === 0 ? (
        <p>No data</p>
      ) : (
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
                    {editingID === row.id && editableFields?.some((f) => f.name === header) ? (
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
                      {editableFields && (
                        <button type="button" onClick={() => handleEdit(row.id)}>
                          Edit
                        </button>
                      )}
                      {handleDelete && 
                        <button type="button" onClick={() => handleDelete(row.id)}>
                          Delete
                        </button>
                      }
                      {onRowSelect && (
                        <button type="button" onClick={() => {onRowSelect(row.id);}}>
                          Select
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
