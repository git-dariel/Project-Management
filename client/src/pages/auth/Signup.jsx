import React, { useState } from "react";
import userService from "@/services/user.service";
import { Link } from "react-router-dom";
import { validateSignupForm } from "@/components/yup/validate.signup";
import { Toaster, toast } from "sonner";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateSignupForm(formData); // yup validation
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      // Form is valid, handle form submission logic here
      console.log("Form data:", formData);
    }

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // service
      const newUser = await userService.registerUser(formData);
      console.log(newUser._id, newUser.email, newUser.role);
      history.push("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Toaster richColors />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Project Scheduler
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.firstname && (
                    <div className="text-red-600 text-xs">
                      {errors.firstname}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.lastName && (
                    <div className="text-red-600 text-xs">
                      {errors.lastname}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500                "
                  required
                />
                {errors.role && (
                  <div className="text-red-600 text-xs">{errors.role}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
                {errors.email && (
                  <div className="text-red-600 text-xs">{errors.email}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.password && (
                    <div className="text-red-600 text-xs">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-600 text-xs">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
