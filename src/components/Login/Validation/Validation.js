import * as yup from "yup";

const Validation = yup.object().shape({
    name: yup.string()
        .max(15, "Must be 15 characters or less")
        .test('length', 'First Name must have more than 1 character', (value) => {
            return value && value.length > 2;
        })
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .required("Required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password")
});

export default Validation