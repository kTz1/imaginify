import { navLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { Collection } from "@/components/shared/Collection";
import { getAllImages } from "@/lib/actions/image.actions";
import { headers } from "next/headers";

const Home = async () => {
  // Get the full URL of the request
  const headersList = headers();
  const fullUrl = (await headersList).get("x-url") || ""; // Fallback just in case

  const url = new URL(fullUrl, "http://localhost"); // base URL needed to parse
  const pageParam = url.searchParams.get("page");
  const queryParam = url.searchParams.get("query");

  const page = Number(pageParam) || 1;
  const searchQuery = queryParam || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>

        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image
                  src={link.icon}
                  alt="image"
                  width={24}
                  height={24}
                  fetchPriority="high"
                />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
