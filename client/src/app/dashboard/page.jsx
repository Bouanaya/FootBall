// app/dashboard/page.js
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { adminAuth } from "../../lib/firebaseAdmin"
import  Logout  from "../../components/Buttons/logout"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  

  if (!token) {
    redirect("/login")
  }

  let user
  try {
    const decodedToken = await adminAuth().verifyIdToken(token)
    user = decodedToken
 
    
  }
   catch (error) {

    redirect("/login")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>مرحباً {user.email}</h1>
      <Logout/>
    </div>
  )
}
