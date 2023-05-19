import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const registerResponse = await api.post("/register", {
    code,
  });

  const redirectTo = request.cookies.get("redirectTo")?.value;

  const { token } = registerResponse.data;

  const redirectURL = redirectTo ?? new URL("/", request.url);

  const cookieExpires = 60 * 60 * 60 * 24 * 30; // 30 days

  return NextResponse.redirect(redirectURL, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpires}`,
    },
  });
}
