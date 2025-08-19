// app/dashboard/layout.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "../../lib/firebaseAdmin";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";

export default async function ProtectedLayout({ children }) {
  const sessionCookie = cookies().get("session")?.value;

  // if (!sessionCookie) {
  //   redirect("/login?next=/dashboard");
  // }

  // try {
  //   await adminAuth.verifySessionCookie(sessionCookie, true); // ✅ خاص نستعمل verifySessionCookie
    return <DashboardLayout>{children}</DashboardLayout>;
  // } catch (e) {
  //   console.error("Session invalid:", e);
  //   redirect("/login?next=/dashboard");
  // }
}
