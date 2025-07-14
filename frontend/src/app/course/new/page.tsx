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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <Formik
        initialValues={{ title: "", description: "", level: "BEGINNER" }}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          try {
            const course = await createCourse(values.title, values.description, values.level);
            router.push(`/`);
          } catch {
            setError("Failed to create course. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <Field name="title" className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <Field name="description" as="textarea" className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block mb-1">Level</label>
              <Field as="select" name="level" className="w-full border p-2 rounded">
                <option value="BEGINNER">BEGINNER</option>
                <option value="INTERMADIATE">INTERMADIATE</option>
                <option value="ADVANCED">ADVANCED</option>
              </Field>
            </div>
            {error && <div className="text-red-600">{error}</div>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Course"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
} 