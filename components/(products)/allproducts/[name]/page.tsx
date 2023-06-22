import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { Image as IImage } from "sanity";
import { filterProductData } from "@/app/datafetching";
import Counter from "@/components/counter/counter";
import Overview from "@/components/all-other/overview";

function removeH(str: string) {
  return str.replace(/-/g, " ");
}

const dbdata = async (value: string) => {
  const res = await filterProductData(value);
  return res;
};

interface Iproduct {
  name: string;
  type: string;
  price: number;
  for: string;
  detail: string;
  image: IImage;
  _id: string;
}

const Page = async ({ params }: { params: { name: string } }) => {
  const value = removeH(params.name);
  const data: Iproduct = await dbdata(value);

  return (
    <>
      <div className="flex justify-between border-box py-16 bg-[#FCFCFC]">
        <div id="image" className="flex gap-8 ">
          <div id="small-image" className="flex flex-col gap-4 ">
            <Image
              src={urlForImage(data.image).url()}
              alt=""
              width={100}
              height={100}
            />
          </div>

          <div id="large-image" className=" flex w-80% h-100% pr-4">
            <Image
              src={urlForImage(data.image).url()}
              alt=""
              width={600}
              height={500}
              className="w-100% h-100%"
            />
          </div>
        </div>
        <div id="detail" className="flex flex-col gap-10  pt-10 pr-16">
          <div
            id="name-tytpe"
            className="font-normal text-[1.625rem] leading-9 tracking-wider "
          >
            {data.name}
            <p className="text-[1.625rem] font-semibold text-gray-400 leading-8 tracking-wider ">
              {data.type}
            </p>
          </div>
          <div id="sizes" className="flex flex-col gap-6">
            <p className=" text-base font-bold">SELECT SIZE</p>
            <ul className="flex gap-4 text-gray-400 font-bold">
              <li className="w-10 h-10 cursor-pointer flex justify-center items-center  hover:bg-white hover:rounded-full hover:shadow-md">
                XS
              </li>
              <li className="w-10 h-10 cursor-pointer flex justify-center items-center  hover:bg-white hover:rounded-full hover:shadow-md">
                S
              </li>
              <li className="w-10 h-10 cursor-pointer flex justify-center items-center  hover:bg-white hover:rounded-full hover:shadow-md">
                M
              </li>
              <li className="w-10 h-10 cursor-pointer flex justify-center items-center  hover:bg-white hover:rounded-full hover:shadow-md">
                L
              </li>
              <li className="w-10 h-10 cursor-pointer flex justify-center items-center  hover:bg-white hover:rounded-full hover:shadow-md">
                XL
              </li>
            </ul>
          </div>
          <div className="flex justify-start items-center">
            <Counter price={data.price} product_id={data._id} />
          </div>
        </div>
      </div>
      <Overview />
    </>
  );
};

export default Page;
