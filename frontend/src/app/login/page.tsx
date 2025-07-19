"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux-store/userSlice";
import { useCallback, useState } from "react";
import { getUserByEmail } from "../../graphql/queries";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = useCallback(async (values: any) => {
    setError("");
    try {
      const user = await getUserByEmail(values.email);
      if (user) {
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else {
        setError("No user found with this email.");
      }
    } catch {
      setError("Login failed. Please try again.");
    }
  }, [dispatch, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-blue-100">
        <div className="flex flex-col items-center mb-6">
          <span className="text-3xl font-extrabold text-blue-700 mb-2">EdTech Platform</span>
          <span className="text-sm text-gray-500">Login to continue</span>
        </div>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">Email</label>
                <Field name="email" type="email" className="w-full border border-gray-200 p-2 rounded focus:ring-2 focus:ring-blue-400" required />
              </div>
              {error && <div className="text-red-600">{error}</div>}
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg shadow-lg font-semibold hover:scale-105 transition-transform">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
} 