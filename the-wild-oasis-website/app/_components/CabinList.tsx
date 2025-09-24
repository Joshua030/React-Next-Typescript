import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import { Cabin } from "../_types/generalTypes";
import CabinCard from "./CabinCard";

interface CabinListProps {
  filter: string;
}

const CabinList = async ({ filter }: CabinListProps) => {
  // no  catch any data
  noStore();
  const cabins: Partial<Cabin>[] = await getCabins();
  if (!cabins.length) return null;

  let displayedCabins;

  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => (cabin.maxCapacity || 0) <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => (cabin.maxCapacity || 0) >= 4 && (cabin.maxCapacity || 0) <= 7,
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => (cabin.maxCapacity || 0) >= 8);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
