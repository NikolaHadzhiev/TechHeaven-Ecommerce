import * as yup from 'yup'

export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full name is required"),
        mainAddress: yup.string().required("Main address is required"),
        optionalAddress: yup.string().optional(),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        zipCode: yup.string().required("Zip code is required"),
        country: yup.string().required("Country is required")
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    })
]