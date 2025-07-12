"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-store";
import { Course } from "../../../types";
import { getCourses, enrollUser, getEnrollment } from "../../../graphql/queries";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollError, setEnrollError] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCourses()
      .then((courses) => {
        const found = courses.find((c) => c.id === id);
        if (!found) setError("Course not found");
        setCourse(found || null);
      })
      .catch(() => setError("Failed to load course"))
      .finally(() => setLoading(false));
    if (user && user.id && id) {
      const courseId = Array.isArray(id) ? id[0] : id;
      getEnrollment(user.id, courseId).then((enrollment) => {
        setIsEnrolled(!!enrollment);
      });
    }
  }, [id, user]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error || !course) return <div className="p-6 text-red-600">{error || "Course not found"}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="mb-2">{course.description}</p>
      <p className="mb-4 text-sm text-gray-600">Level: {course.level}</p>
      {!isEnrolled ? (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          onClick={async () => {
            setEnrollError("");
            try {
              await enrollUser(user.id, course.id);
              router.push(`/enroll-confirm?id=${course.id}`);
            } catch {
              setEnrollError("Enrollment failed. You may already be enrolled or there was a server error.");
            }
          }}
        >
          Enroll
        </button>
      ) : (
        <div className="mb-4 text-green-700 font-semibold">Already Enrolled</div>
      )}
      {enrollError && <div className="text-red-600 mb-2">{enrollError}</div>}
      {user.role === "professor" && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => router.push(`/course/${course.id}/edit`)}
        >
          Edit Course
        </button>
      )}
    </div>
  );
}
