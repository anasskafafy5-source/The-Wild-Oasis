import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  // loading state from react query
  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resource={"Cabins"} />;

  //[1]. for filtering
  const filteredValue = searchParams.get("discount") || "all";
  let filterdCabins = cabins;
  if (filteredValue === "all") filterdCabins = cabins;
  else if (filteredValue === "with_discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount > 0);
  else if (filteredValue === "no_discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount === 0);

  //[2]. for sorting
  const sortValue = searchParams.get("sortBy") || "cabinName_asc";
  const [sortedField, sortedDirection] = sortValue.split("_");

  const modify = sortedDirection === "asc" ? 1 : -1;

  const sortedCabin = filterdCabins.sort(
    (a, b) => (a[sortedField] - b[sortedField]) * modify,
  );

  return (
    <Menus>
      <Table columns={`0.6fr 1.8fr 2.2fr 1fr 1fr 1fr`}>
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filterdCabins}
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
