"use client";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-store';
import { useRouter } from 'next/navigation';

export default function Header() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-3">
      <span className="text-xl font-bold text-blue-700 tracking-tight cursor-pointer" onClick={() => router.push("/")}>EdTech Platform</span>
      {user && user.email && (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </header>
  );
} 