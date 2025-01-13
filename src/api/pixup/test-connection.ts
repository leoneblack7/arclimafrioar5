import { pixUpService } from "@/services/pixUpService";

export async function POST(request: Request) {
  try {
    const { clientId, clientSecret } = await request.json();

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ message: "Client ID e Client Secret são obrigatórios" }), 
        { status: 400 }
      );
    }

    // Testa autenticação com PixUp
    await pixUpService.authenticate(clientId, clientSecret);

    return new Response(
      JSON.stringify({ message: "Conexão estabelecida com sucesso" }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao testar conexão com PixUp:", error);
    const errorMessage = error instanceof Error ? error.message : "Falha ao autenticar com PixUp";
    return new Response(
      JSON.stringify({ message: errorMessage }), 
      { status: 500 }
    );
  }
}