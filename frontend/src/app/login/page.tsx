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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1">Email</label>
                <Field name="email" type="email" className="w-full border p-2 rounded" required />
              </div>
              {error && <div className="text-red-600">{error}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
} 