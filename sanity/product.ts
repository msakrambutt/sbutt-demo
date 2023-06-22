// schemas/product.js
export const product = {
  name: "product",
  type: "document",
  title: "Products",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Product Name",
    },
    {
      name: "type",
      type: "string",
      title: "Product Type",
    },
    {
      name: "for",
      type: "string",
      title: "Product For",
      options: {
        list: [
          { title: "Male", value: "male" },
          { title: "Female", value: "female" },
          { title: "Kids", value: "kids" },
        ],
      },
    },
    {
      name: "detail",
      type: "string",
      title: "Product Detail",
    },
    {
      name: "price",
      type: "number",
      title: "Product Price",
    },
    {
      name: "image",
      type: "image",
      title: "Product Image",
    },
  ],
};
