import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const isPopup = req.nextUrl.searchParams.get("popup") === "1";
    
    // Generate a secure state token with popup flag
    const state = Buffer.from(JSON.stringify({
      nonce: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      isPopup: isPopup,
    })).toString('base64');
    
    // Set state in a secure HttpOnly cookie
    const response = new NextResponse(null, { status: 302 });
    response.headers.set('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
    
    // Build the Google OAuth consent screen URL with callback URL in state
    const callbackUrl = isPopup 
      ? `${baseUrl}/api/auth/callback/google?popup=true`
      : `${baseUrl}/api/auth/callback/google`;
    
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      redirect_uri: callbackUrl,
      response_type: "code",
      scope: "openid profile email",
      state: state,
    });
    
    // Redirect to Google's OAuth endpoint
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    response.headers.set('Location', googleAuthUrl);
    
    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.json({ error: "OAuth initiation failed" }, { status: 500 });
  }
}
