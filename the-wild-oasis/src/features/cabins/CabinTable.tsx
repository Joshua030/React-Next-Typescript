// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { Tables } from "../../types/supabase";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";
import Empty from "../../ui/Empty";

type Cabin = Tables<"cabins">;
type SortCabin = Pick<Cabin, "name" | "regularPrice" | "maxCapacity">;

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

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

const CabinTable = () => {
  // const { data: cabins, isLoading } = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: getCabins,
  // });
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins?.length) return <Empty resourceName="cabins" />;

  const discountFilter = searchParams.get("discount") ?? "all";

  //FILTER

  let filteredCabins = cabins;
  if (discountFilter === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  } else if (discountFilter === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => Number(cabin.discount) > 0);
  }

  //SORT

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, order] = sortBy.split("-") as [keyof SortCabin, "asc" | "desc"];

  const modifier = order === "asc" ? 1 : -1;

  const sortedCabins = [...(filteredCabins ?? [])].sort((a, b) => {
    const av = a[field];
    const bv = b[field];

    // Handle undefined/null deterministically
    if (av == null && bv == null) return 0;
    if (av == null) return -1 * modifier;
    if (bv == null) return 1 * modifier;

    // Number compare
    if (typeof av === "number" && typeof bv === "number") {
      const cmp = av - bv; // no precedence issue
      return cmp * modifier;
    }

    // String compare (case-insensitive, returns 0 on equality)
    if (typeof av === "string" && typeof bv === "string") {
      const cmp = av.localeCompare(bv, undefined, { sensitivity: "base" });
      return cmp * modifier;
    }

    // Fallback: compare stringified values
    const cmp = String(av).localeCompare(String(bv), undefined, { sensitivity: "base" });
    return cmp * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>ID</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body<Cabin> data={sortedCabins ?? []} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}></Table.Body>
      </Table>
    </Menus>
  );
};

export default CabinTable;
