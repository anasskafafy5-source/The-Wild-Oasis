import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinsOperations() {
  return (
    <TableOperations>
      <Filter
        filterValue={"discount"}
        options={[{ value: "all", label: "All" } , { value: "with_discount", label: "with Discount" } , { value: "no_discount", label: "No Discount" }]}
      />
      <SortBy  options={[
        {value: "cabinName_asc" , label: "Sort By Name From (A to Z)"},
        {value: "cabinName_dec" , label: "Sort By Name From (Z to A)"},
        {value: "regularPrice_asc" , label: "Sort By Price (low first)"},
        {value: "regularPrice_dec" , label: "Sort By Price (high first)"},
        {value: "maxCapacity_asc" , label: "Sort By Capacity (low first)"},
        {value: "maxCapacity_dec" , label: "Sort By Capacity (high first)"},
      ]}/>
    </TableOperations>
  );
}

export default CabinsOperations;
