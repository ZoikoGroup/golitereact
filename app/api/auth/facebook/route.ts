import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    
    // Generate a secure state token
    const state = Buffer.from(JSON.stringify({
      nonce: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    })).toString('base64');
    
    // Set state in a secure HttpOnly cookie
    const response = new NextResponse(null, { status: 302 });
    response.headers.set('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
    
    // Build the Facebook OAuth URL
    const params = new URLSearchParams({
      client_id: process.env.FACEBOOK_CLIENT_ID || "",
      redirect_uri: `${baseUrl}/api/auth/facebook/callback`,
      response_type: "code",
      scope: "public_profile,email",
      state: state,
    });
    
    // Redirect to Facebook's OAuth endpoint
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
    response.headers.set('Location', facebookAuthUrl);
    
    return response;
  } catch (error) {
    console.error("Facebook OAuth error:", error);
    return NextResponse.json({ error: "OAuth initiation failed" }, { status: 500 });
  }
}
