import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Image as IImage } from "sanity";
import { Allproductdata } from "../../datafetching";

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
  res = res.filter((data: any) => data.for === "male");
  return (
    <div className="grid grid-cols-1 md:grid md:grid-cols-4  gap-[4rem] sm:grid sm:grid-cols-2   justify-between items-center my-16 mx-32 ">
      {res.map((data: any) => (
        <div key={data.name}>
          <Link href={`./allproducts/${cleanURLString(data.name)}`}>
            <Image
              className="w-250 h-270"
              src={urlForImage(data.image).url()}
              alt=""
              width={250}
              height={270}
            />
            <p className="mt-2 font-bold text-md leading-6 tracking-loose ">
              {data.name}
            </p>
            <p className="mt-2 font-bold text-sm text-gray-400 leading-6 tracking-loose ">
              {data.type}
            </p>
            <p className="mt-4 font-bold text-xl leading-6 tracking-loose ">
              ${data.price}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
