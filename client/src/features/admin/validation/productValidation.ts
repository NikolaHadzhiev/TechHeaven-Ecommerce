import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  brand: yup.string().required("Brand is required"),
  type: yup.string().required("Type is required"),
  price: yup.number().typeError('Price must be a number').required("Price is required").moreThan(99),
  quantityInStock: yup.number().typeError('Quantity must be a number').required("Quantity is required").min(0),
  description: yup.string().required("Description is required"),
  file: yup.mixed().when('pictureUrl', {
      is: (value: string) => !value,
      then: (schema) => schema.required("Please provide an image "),
      otherwise: (schema) => schema.nullable()
    })
});
