export async function GET(req: Request) {
  const url = new URL(req.url);
  const error = url.searchParams.get("error");
  const success = !error;

  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Authentication</title>
    </head>
    <body>
      <script>
        try {
          const params = new URLSearchParams(window.location.search);
          const error = params.get('error');
          const success = !error;
          
          const message = {
            type: 'oauth',
            provider: 'google',
            success: success,
            error: error || null
          };
          
          // Post message back to the parent window (the login page)
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(message, window.location.origin);
            console.log('Message sent to opener:', message);
          }
        } catch (e) {
          console.error('Popup callback error:', e);
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage({
              type: 'oauth',
              provider: 'google',
              success: false,
              error: e.message
            }, window.location.origin);
          }
        }
        
        // Close the popup after a brief delay
        setTimeout(() => {
          window.close();
        }, 500);
      </script>
      <div style="font-family: system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial; padding: 2rem; text-align: center; color: #333;">
        <p>Authentication complete. Closing window...</p>
      </div>
    </body>
  </html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
