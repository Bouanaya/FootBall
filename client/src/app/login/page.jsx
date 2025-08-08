import LoginForm from "../../components/forms/LoginForm"

// إذا بغيت metadata، خليها في نفس الملف، بلا "use client"
export const metadata = {
  title: "Login",
  description: "صفحة تسجيل الدخول"
}

// إذا عندك كومبوننت client، خليها في ملف ثاني مثلا LoginForm.jsx واستوردها هنا


export default function LoginPage() {
  return (
    <main>
 
      <LoginForm />

    </main>
  )
}
