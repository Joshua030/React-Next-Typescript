import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// 1) Define your params once
type Params = { cabinId: string };

// 2) A tiny helper for “has params”
interface SingleCabinParams {
  params: Params;
}

// 3) Extend it for the full props you might pass around
// interface SingleCabinProps extends SingleCabinParams{
// }

export async function generateMetadata({ params }: SingleCabinParams) {
  const { name = "" } = (await getCabin(params.cabinId)) ?? {};
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins?.map((cabin) => ({ cabinId: cabin?.id.toString() }));
  return ids;
}

export default async function Page({ params }: SingleCabinParams) {
  const cabin = await getCabin(params.cabinId);
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<SpinnerMini />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
