'use client';
import { useEffect, useState } from 'react';
import { Course } from '../types';
import { getCourses } from '../graphql/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-store';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getCourses()
      .then((data) => setCourses(data))
      .catch(() => setError('Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user || !user.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-10 flex flex-col items-center">
          <span className="text-4xl font-extrabold text-blue-700 mb-2">Welcome to EdTech Platform</span>
          <span className="text-lg text-gray-500 mb-6">Please login to continue</span>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg hover:scale-105 transition-transform"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-blue-800">Available Courses</h1>
        {user.role === 'PROFESSOR' && (
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg font-semibold hover:scale-105 transition-transform"
            onClick={() => router.push('/course/new')}
          >
            + Create New Course
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 hover:shadow-xl transition-shadow border border-gray-100 hover:border-blue-300"
          >
            <h2 className="text-lg font-bold text-blue-700 mb-1">{course.title}</h2>
            <p className="text-gray-700 flex-1">{course.description}</p>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full w-fit mb-2">Level: {course.level}</span>
            <button
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow"
              onClick={() => router.push(`/course/${course.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}