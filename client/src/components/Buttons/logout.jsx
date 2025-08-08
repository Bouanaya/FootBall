"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" })
     toast("❌ تم  تسجيل الخروج");
    router.push("/login") // توجيه بعد مسح الكوكي
  }

  return (
    <button onClick={handleLogout}>
      تسجيل الخروج
    </button>
  )
}
