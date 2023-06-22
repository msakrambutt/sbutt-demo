import { client } from "@/sanity/lib/client";

export const Allproductdata = async () => {
  const response = await client.fetch(`*[_type=='product']{
    name,type,price,detail,image,for
  }`);
  return response;
};

export const filterProductData = async (value: string) => {
  const [response] = await client.fetch(
    `*[_type == "product" && name == "${value}"]{
      name,
      type,
      price,
      detail,
      image,
      _id
    }`
  );
  return response;
};

export const filterProductName = async (value: string) => {
  try {
    const [response] = await client.fetch(
      `*[_type == "product" && _id == "${value}"]{
      name,
      type,
      price,
      image,
    }`
    );
    return response;
  } catch (error) {
    console.log("Not found");
  }
};
