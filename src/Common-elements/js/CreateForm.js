const CreateForm = ({ fields, createItem }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    
    await createItem(payload);
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
                  {option.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </option>
              ))}
            </select>
          ) : (
            <input type={type} name={name} required={required} />
          )}
        </label>
      ))}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateForm;
