const CreateForm = ({ fields, createItem }) => {
  //TODO: move this somewhere the table can use too
  const sanitizePayload = (payload, fields) => {
    const formatDateTime = (value) => {
      const date = new Date(value);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };
  
    return fields.reduce((acc, field) => {
      const key = field.name;
      const value = payload[key];
  
      switch (field.type) {
        case "number":
        case "decimal":
          acc[key] = value === undefined || value === "" ? null : Number(value);
          break;
        case "datetime-local":
          acc[key] = value === undefined || value === "" ? null : formatDateTime(value);
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    const sanitizedPayload = sanitizePayload(payload, fields);
       
    await createItem(sanitizedPayload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({ label, name, type, required, options }) => (
        <label key={name}>
          {label}:
          {type === "select" ? (
            <select name={name} required={required}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type === "decimal" ? "number" : type}
              name={name}
              step={type === "decimal" ? "0.01" : "1"}
              required={required}
            />
          )}
        </label>
      ))}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateForm;
