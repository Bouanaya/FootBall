// app/api/login/route.js
import { NextResponse } from "next/server"
import { adminAuth } from "../../../lib/firebaseAdmin"
import { serialize } from "cookie"

export async function POST(request) {
  try {
  
    const { idToken } = await request.json()
    const decodedToken = await adminAuth().verifyIdToken(idToken)

    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const cookie = serialize("session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 5, // 5 أيام
    })

    return new NextResponse(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 401 })
  }
}
