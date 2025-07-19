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
  const [enrolling, setEnrolling] = useState(false);

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

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></span></div>;
  if (error || !course) return <div className="p-6 text-red-600">{error || "Course not found"}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 border border-blue-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" /></svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-blue-800 mb-1">{course.title}</h1>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Level: {course.level}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-6 text-lg">{course.description}</p>
      {user.role === 'STUDENT' && (!isEnrolled ? (
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50"
          disabled={enrolling}
          onClick={async () => {
            setEnrollError("");
            setEnrolling(true);
            try {
              await enrollUser(user.id, course.id);
              router.push(`/enroll-confirm?id=${course.id}`);
            } catch {
              setEnrollError("Enrollment failed. You may already be enrolled or there was a server error.");
            } finally {
              setEnrolling(false);
            }
          }}
        >
          {enrolling ? (
            <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> Enrolling...</span>
          ) : "Enroll"}
        </button>
      ) : (
        <div className="mb-4 text-green-700 font-semibold flex items-center gap-2"><svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Already Enrolled</div>
      ))}
      {enrollError && <div className="text-red-600 mb-2">{enrollError}</div>}
      {user.role === "PROFESSOR" && (
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow-lg font-semibold hover:scale-105 transition-transform ml-2"
          onClick={() => router.push(`/course/${course.id}/edit`)}
        >
          <span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2l-6 6m2-2l6-6" /></svg>Edit Course</span>
        </button>
      )}
    </div>
  );
}
