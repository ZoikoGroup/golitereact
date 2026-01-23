import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const callbackUrl = `${baseUrl}/api/auth/popup-callback`;
    
    // Build the Google OAuth consent screen URL with proper parameters
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      redirect_uri: `${baseUrl}/api/auth/callback/google`,
      response_type: "code",
      scope: "openid profile email",
      state: Math.random().toString(36).substring(7), // Simple state token
    });
    
    // Redirect to Google's OAuth endpoint
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.json({ error: "OAuth initiation failed" }, { status: 500 });
  }
}
