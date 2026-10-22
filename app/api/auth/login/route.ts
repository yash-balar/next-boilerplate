import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (typeof body.email !== "string" || typeof body.password !== "string") {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 },
      );
    }

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { message: "Backend URL is not configured." },
        { status: 500 },
      );
    }

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: result.message || "Login failed." },
        { status: response.status },
      );
    }

    if (typeof result.token !== "string" || !result.token) {
      return NextResponse.json(
        { message: "Authentication token was not returned." },
        { status: 502 },
      );
    }

    const res = NextResponse.json({
      message: "Login successful.",
      user: result.user,
    });

    res.cookies.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch {
    return NextResponse.json(
      { message: "Unable to process login request." },
      { status: 500 },
    );
  }
}
