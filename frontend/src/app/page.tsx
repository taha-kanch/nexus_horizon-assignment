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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to EdTech Platform</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Available Courses</h1>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {user.role === 'PROFESSOR' && (
        <button
          className="mb-4 bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => router.push('/course/new')}
        >
          + Create New Course
        </button>
      )}
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p>{course.description}</p>
            <p className="text-sm text-gray-600">Level: {course.level}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => router.push(`/course/${course.id}`)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}