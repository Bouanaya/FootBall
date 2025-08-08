"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../lib/firebase"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login")
      } else {
        setUser(currentUser)
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>مرحباً {user?.email}</h1>
      <button onClick={handleLogout}>تسجيل الخروج</button>
    </div>
  )
}
