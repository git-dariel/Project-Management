import * as Yup from 'yup';

export const validateSignupForm = async (formData) => {
  try {
    const schema = Yup.object().shape({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      role: Yup.string().required("Role is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
    });

    await schema.validate(formData, { abortEarly: false });
    return null; // if no errors
  } catch (error) {
    const validationErrors = {};
    error.inner.forEach(err => {
      validationErrors[err.path] = err.message;
    });
    return validationErrors;
  }
};