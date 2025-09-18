import Image from "next/image";
import bg from "@/public/bg.png";
import Link from "next/link";

const Home = async () => {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        alt="Mountains and forests with two cabins"
        className="object-cover object-top"
        quality={80}
      />

      <div className="relative z-10 text-center">
        <h1 className="mb-10 text-8xl font-normal tracking-tight text-primary-50">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
};

export default Home;
