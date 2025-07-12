"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function EnrollConfirmPage() {
  const params = useSearchParams();
  const courseId = params.get("id");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Enrollment Confirmed!</h1>
        <p className="mb-4">You have successfully enrolled in course <span className="font-semibold">{courseId}</span>.</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => router.push("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
