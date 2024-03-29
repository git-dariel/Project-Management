import * as Yup from "yup";

export const validateLoginForm = async (formData) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    });

    await schema.validate(formData, { abortEarly: false });
    return null; // No errors
  } catch (error) {
    const validationErrors = {};
    error.inner.forEach((err) => {
      validationErrors[err.path] = err.message;
    });
    return validationErrors;
  }
};
