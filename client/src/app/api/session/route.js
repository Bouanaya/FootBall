// app/api/session/route.js
import { NextResponse } from "next/server";
import { adminAuth } from "../../../lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ error: "No token" }, { status: 400 });

    // Expire in 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return res;
  } catch (err) {
    console.error("Error creating session:", err);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
