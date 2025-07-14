"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-store";
import { Course } from "../../../../types";
import { getCourses } from "../../../../graphql/queries";
import { Formik, Form, Field } from "formik";

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user.role !== "PROFESSOR") {
      router.replace(`/course/${id}`);
      return;
    }
    setLoading(true);
    getCourses()
      .then((courses) => {
        const found = courses.find((c) => c.id === id);
        if (!found) setError("Course not found");
        setCourse(found || null);
      })
      .catch(() => setError("Failed to load course"))
      .finally(() => setLoading(false));
  }, [id, user.role, router]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error || !course) return <div className="p-6 text-red-600">{error || "Course not found"}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <Formik
        initialValues={{
          title: course.title,
          description: course.description,
          level: course.level,
        }}
        onSubmit={(values) => {
          // TODO: Implement GraphQL mutation to update course
          alert("Course updated! (Mutation not implemented)");
          router.push(`/course/${id}`);
        }}
      >
        {() => (
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
                <option value="BIGINNER">BIGINNER</option>
                <option value="INTERMADIATE">INTERMADIATE</option>
                <option value="ADVANCED">ADVANCED</option>
              </Field>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
} 