import { Suspense } from "react";
import EnrollConfirmPage from "./EnrollConfirmPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnrollConfirmPage />
    </Suspense>
  );
}
