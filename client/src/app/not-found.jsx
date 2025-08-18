// app/not-found.jsx
"use client";
import Link from "next/link";


export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-green-400 text-gray-900 p-6">

      <h1 className="text-6xl font-extrabold mt-6">404</h1>
      <p className="mt-4 text-xl">أوبس! الصفحة التي تبحث عنها غير موجودة.</p>
      <p className="mt-2 text-gray-700">ربما ضاعتك الكرة ⚽</p>
      <Link href="/" className="inline-block mt-6 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-green-100 transition">
        العودة للرئيسية
      </Link>
    </div>
  );
}
