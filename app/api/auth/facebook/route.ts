import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    
    // Build the Facebook OAuth URL with proper parameters
    const params = new URLSearchParams({
      client_id: process.env.FACEBOOK_CLIENT_ID || "",
      redirect_uri: `${baseUrl}/api/auth/callback/facebook`,
      response_type: "code",
      scope: "public_profile,email",
      state: Math.random().toString(36).substring(7), // Simple state token
    });
    
    // Redirect to Facebook's OAuth endpoint
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
    return NextResponse.redirect(facebookAuthUrl);
  } catch (error) {
    console.error("Facebook OAuth error:", error);
    return NextResponse.json({ error: "OAuth initiation failed" }, { status: 500 });
  }
}
