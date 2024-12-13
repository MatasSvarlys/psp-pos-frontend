import React, { useState } from "react";

const CreateForm = ({ headers, requiredFields = [], onSubmit }) => {
  const [formData, setFormData] = useState(headers);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = requiredFields.filter(
      (field) => !formData[field.toLowerCase()]
    );
    if (missingFields.length > 0) {
      alert(`Please fill out the required fields: ${missingFields.join(", ")}`);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Record</h2>
      {headers
        .filter((header) => header.toLowerCase() !== "id") // Skip 'id'
        .map((header) => (
          <div key={header}>
            <label>
              {header}{" "}
              {requiredFields.includes(header.toLowerCase()) && (
                <span style={{ color: "red" }}>*</span>
              )}
              :{" "}
              <input
                type="text"
                name={header.toLowerCase()}
                value={formData[header.toLowerCase()]}
                onChange={handleChange}
                placeholder={`Enter ${header}`}
              />
            </label>
          </div>
        ))}
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateForm;
