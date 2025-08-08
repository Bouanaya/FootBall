import { NextResponse } from "next/server"
import { serialize } from "cookie"

export async function POST() {
  // نصنع كوكي بنفس الاسم ولكن بصلاحية منتهية
  const cookie = serialize("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), // ينتهي فوراً
  })

  return new NextResponse(JSON.stringify({ status: "logged_out" }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  })
}
