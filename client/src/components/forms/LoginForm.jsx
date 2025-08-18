"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import Image from 'next/image'
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import SplashCursor from "../nurui/splash-cursor";
import { toast } from "sonner";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Simulate error for demo

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      toast("✅ تم تسجيل الدخول بنجاح");
      router.push("/dashboard");
    } catch (err) {
      toast("❌ البريد الإلكتروني أو كلمة السر غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen img flex items-center justify-center p-4">
      {/* Login Container */}
      <div className="relative w-full max-w-md">
        {/* Black Card */}
        <div className="bg-slate-900/80 rounded-3xl shadow-2xl border border-gray-800 p-8 relative overflow-hidden">
          {/* Card Accent Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-blue-600/5 to-green-600/5 rounded-3xl"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-300 rounded-2xl mb-4 shadow-lg">
               <Image
        src="/passkey.png" // المسار من public folder
        alt="My photo"
      width={50}          // عيّن العرض المناسب
      height={50} 
      />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">أهلاً بك</h1>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />

              <Input
                type="password"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
              />

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm animate-shake">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className={`mt-8  w-[100px] ${
                  loading
                    ? "opacity-70 cursor-not-allowed w-[200px] bg-green-300"
                    : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري التحميل...
                  </div>
                ) : (
                  "دخول"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute top-1/3 left-0 w-1 h-1 bg-green-300 rounded-full animate-ping delay-700"></div>
        </div>
      </div>
      {/* <SplashCursor /> */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
