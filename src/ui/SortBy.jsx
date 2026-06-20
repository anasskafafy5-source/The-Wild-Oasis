import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || "";
  function handleChange(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <Select
        options={options}
        onChange={handleChange}
        value={sortValue}
        type="white"
      />
    </div>
  );
}

export default SortBy;
