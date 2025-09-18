import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      {/* First way to use nextjs Images */}
      {/* <Image height={60} width={60} alt="The Wild Oasis logo" src="logo.png" /> */}
      <Image
        alt="The Wild Oasis logo"
        src={logo}
        quality={90}
        width={60}
        height={60}
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
