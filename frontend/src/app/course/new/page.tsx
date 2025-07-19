"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-store";
import { Formik, Form, Field } from "formik";
import { createCourse } from "../../../graphql/queries";
import { useState } from "react";

export default function NewCoursePage() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [error, setError] = useState("");

  if (user.role !== "PROFESSOR") {
    if (typeof window !== "undefined") router.replace("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg border border-blue-100">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Create New Course</h1>
        <Formik
          initialValues={{ title: "", description: "", level: "BEGINNER" }}
          onSubmit={async (values, { setSubmitting }) => {
            setError("");
            try {
              const course = await createCourse(values.title, values.description, values.level);
              router.push(`/course/${course.id}`);
            } catch {
              setError("Failed to create course. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Title</label>
                <Field name="title" className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Description</label>
                <Field name="description" as="textarea" className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Level</label>
                <Field as="select" name="level" className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400">
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMADIATE">INTERMADIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </Field>
              </div>
              {error && <div className="text-red-600">{error}</div>}
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg shadow-lg font-semibold hover:scale-105 transition-transform" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Course"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
} 