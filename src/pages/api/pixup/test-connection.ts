import { pixUpService } from "@/services/pixUpService";

export async function POST(request: Request) {
  try {
    const { clientId, clientSecret } = await request.json();

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ message: "Client ID and Client Secret are required" }), 
        { status: 400 }
      );
    }

    const credentials = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch('https://api.pixup.com.br/authentication', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(
        JSON.stringify({ message: `PixUp API Error: ${error}` }), 
        { status: response.status }
      );
    }

    return new Response(
      JSON.stringify({ message: "Connection successful" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("PixUp test connection error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }), 
      { status: 500 }
    );
  }
}