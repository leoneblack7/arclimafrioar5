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

    // Test authentication with PixUp
    await pixUpService.authenticate(clientId, clientSecret);

    return new Response(
      JSON.stringify({ message: "Connection successful" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("PixUp test connection error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to authenticate with PixUp" }), 
      { status: 500 }
    );
  }
}