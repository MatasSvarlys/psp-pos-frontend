import { useState, useEffect } from "react";
import useCrud from "../../api/useCrud";

export default function SelectBusinessPage() {
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const { data, loading, fetchItems } = useCrud("businesses");  
  useEffect(() => {
    fetchItems();
  }, []);

  const handleSelectBusiness = (event) => {
    const businessId = event.target.value;
    setSelectedBusiness(businessId);

    localStorage.setItem("BusinessId", businessId);
  };

  return (
    <div>
        {!loading &&
        <>
            <h1>Select Your Business</h1>
            <select
                value={selectedBusiness}
                onChange={handleSelectBusiness}
                required
            >
                <option value="" disabled>
                Select a Business
                </option>
                {data.map((business) => (
                <option key={business.id} value={business.id}>
                    {business.name}
                </option>
                ))}
            </select>
        </>
        }

      {selectedBusiness && (
        <p>
          You have selected:{" "}
          {data.find((business) => business.id === selectedBusiness)?.name}
        </p>
      )}
    </div>
  );
};