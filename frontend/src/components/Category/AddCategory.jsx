import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryServices";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  const navigate = useNavigate();

  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["addCategory"],
    onSuccess: () => {
      setTimeout(() => {
        navigate("/categories");
      }, 2000);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Category</h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>

      {/* ✅ Alert messages */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.error ||
            error?.message ||
            "Something went wrong, please try again."
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Category added successfully!"
        />
      )}

      <div className="space-y-2">
        <label htmlFor="type" className="flex gap-2 items-center text-gray-700 font-medium">
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs">{formik.errors.type}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 font-medium">
          <SiDatabricks className="inline mr-2 text-blue-500" />
          Name
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="Name"
          id="name"
          className="w-full mt-1 border border-gray-300 rounded-md py-2 px-3"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`mt-4 ${
          isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded transition`}
      >
        {isPending ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default AddCategory;
