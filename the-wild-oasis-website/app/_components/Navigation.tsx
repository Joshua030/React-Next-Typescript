import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400"
          >
            About
          </Link>
        </li>
        {session?.user?.image ? (
          <li>
            <Link
              href="/account"
              className="flex items-center gap-4 transition-colors hover:text-accent-400"
            >
              <Image
                src={session.user.image}
                width={40}
                height={40}
                alt="profile image"
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href="/account"
              className="transition-colors hover:text-accent-400"
            >
              Guest area
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
