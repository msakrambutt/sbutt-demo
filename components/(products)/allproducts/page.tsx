import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Image as IImage } from "sanity";
import { Allproductdata } from "@/app/datafetching";

interface Iproduct {
  name: string;
  type: string;
  price: number;
  for: string;
  detail: string;
  image: IImage;
}

const cleanURLString = (str: string) => {
  return str.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
};

const Page = async () => {
  let res = await Allproductdata();
  // res = res.filter((data: any) => data.for === "female");
  return (
    <>
      <div className="grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:justify-start  items-start my-16 ">
        {res.map((data: any) => (
          <div key={data.name} className=" max-w-xs mx-auto object-contain">
            <Link href={`./allproducts/${cleanURLString(data.name)}`}>
              <div className="w-full h-64 ">
                <Image
                  src={urlForImage(data.image).url()}
                  alt=""
                  width={250}
                  height={270}
                />
              </div>
              <p className="mt-4 font-semibold text-xl leading-6 tracking-loose">
                {data.name}
              </p>
              <p className="mt-2 font-semibold text-sm text-gray-400 leading-6 tracking-loose">
                {data.type}
              </p>
              <p className="mt-4 font-semibold text-xl leading-6 tracking-loose">
                ${data.price}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
