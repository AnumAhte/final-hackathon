import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      },
      initialValue: "Pending",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customer",
      title: "Customer Information",
      type: "object",
      fields: [
        {
          name: "firstName",
          title: "First Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "lastName",
          title: "Last Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: "phone",
          title: "Phone",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "address",
          title: "Address",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "city",
          title: "City",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "zipCode",
          title: "Zip Code",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "shipmentMethod",
      title: "Shipment Method",
      type: "string",
      options: {
        list: [
          { title: "Standard Shipping", value: "standard" },
          { title: "Express Shipping", value: "express" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
});
