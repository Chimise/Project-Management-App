import * as yup from 'yup';

export const signUpSchema = yup.object({
    name: yup.string().required("Enter your name"),
    email: yup.string().email("Enter a valid email address").required('Your email is required'),
    password: yup.string().trim().min(5, 'Your password should be at least 5 characters').required("Enter your password")
});

export const logInSchema = yup.object({
    email: yup.string().email("Enter a valid email address").required('Your email is required'),
    password: yup.string().trim().min(5, "Your password should be at least 5 characters").required('Enter your password')
})