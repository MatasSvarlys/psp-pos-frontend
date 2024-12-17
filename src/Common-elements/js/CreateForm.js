const CreateForm = ({ fields, createItem }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    const sanitizedPayload = Object.keys(payload).reduce((acc, key) => {
      const field = fields.find((f) => f.name === key);
      //needed cus if its just number, the input field doesnt validate floats 
      if (field?.type === "number" || field?.type === "decimal") {
        const value = payload[key];
        acc[key] = value === "" ? null : Number(value);
      } else {
        acc[key] = payload[key];
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
