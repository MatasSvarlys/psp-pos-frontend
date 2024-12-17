const CreateForm = ({ fields, createItem }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    const formatDateTime = (value) => {
      const date = new Date(value);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };
    
    const sanitizedPayload = Object.keys(payload).reduce((acc, key) => {
      const field = fields.find((f) => f.name === key);
      const value = payload[key];
    
      switch (field?.type) {
        case "number":
        case "decimal":
          acc[key] = value === "" ? null : Number(value);
          break;
        case "datetime-local":
          acc[key] = value === "" ? null : formatDateTime(value);
          break;
        case "checkbox":
          acc[key] = value === "on";
          break;
        default:
          acc[key] = value;
          break;
      }
    
      return acc;
    }, {});
    
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
