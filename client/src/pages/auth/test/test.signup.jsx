import userService from "@/services/user.service";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Call registerUser method from userService
      const newUser = await userService.registerUser(formData);
      // Redirect to login page upon successful registration
      history.push("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle error
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Project Scheduler
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Form fields */}
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-primary-800"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-primary-800"
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-primary-800"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-primary-800"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-primary-800"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-primary-800"
              />
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
