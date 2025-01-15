import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const SupabaseConnectionManager = () => {
  const [projectUrl, setProjectUrl] = useState("");
  const [anonKey, setAnonKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleSaveConnection = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('supabase_connections')
        .insert([
          { project_url: projectUrl, anon_key: anonKey }
        ]);

      if (error) throw error;

      toast.success("Conexão Supabase salva com sucesso!");
      setProjectUrl("");
      setAnonKey("");
    } catch (error) {
      console.error('Error saving Supabase connection:', error);
      toast.error("Erro ao salvar conexão Supabase");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setIsTestingConnection(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(1);

      if (error) throw error;

      toast.success("Conexão com Supabase estabelecida com sucesso!");
    } catch (error) {
      console.error('Error testing Supabase connection:', error);
      toast.error("Erro ao testar conexão com Supabase");
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleImportData = async () => {
    try {
      setIsLoading(true);
      
      // Get data from localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const banners = JSON.parse(localStorage.getItem('banners') || '[]');
      const storeConfig = JSON.parse(localStorage.getItem('store_config') || '{}');

      // Import products
      if (products.length > 0) {
        const { error: productsError } = await supabase
          .from('products')
          .upsert(products.map((p: any) => ({
            title: p.title,
            price: p.price,
            image_url: p.image_url || p.image,
            description: p.description
          })));
        if (productsError) throw productsError;
      }

      // Import orders
      if (orders.length > 0) {
        const { error: ordersError } = await supabase
          .from('orders')
          .upsert(orders.map((o: any) => ({
            status: o.status,
            total_amount: o.total_amount,
            user_id: o.user_id,
            customer_data: o.customer_data,
            payment_method: o.payment_method
          })));
        if (ordersError) throw ordersError;
      }

      // Import banners
      if (banners.length > 0) {
        const { error: bannersError } = await supabase
          .from('banners')
          .upsert(banners.map((b: any) => ({
            image_url: b.image_url,
            active: b.active
          })));
        if (bannersError) throw bannersError;
      }

      // Import store settings
      if (Object.keys(storeConfig).length > 0) {
        const { error: settingsError } = await supabase
          .from('store_settings')
          .upsert([{ logo_url: storeConfig.logo_url }]);
        if (settingsError) throw settingsError;
      }

      toast.success("Dados importados com sucesso!");
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error("Erro ao importar dados");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Conexão Supabase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertDescription>
            <p className="mb-2">Exemplo de dados para conexão:</p>
            <p><strong>URL do Projeto:</strong> https://[seu-projeto].supabase.co</p>
            <p><strong>Chave Anônima:</strong> eyJhbGciOiJIUzI1NiIs... (encontrada em Project Settings {'>'} API)</p>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="URL do Projeto Supabase"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
            />
            <Input
              placeholder="Chave Anônima"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              type="password"
            />
            <Button 
              onClick={handleSaveConnection}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Salvando..." : "Salvar Conexão"}
            </Button>
          </div>

          <Button
            onClick={handleTestConnection}
            disabled={isTestingConnection}
            variant="outline"
            className="w-full"
          >
            {isTestingConnection ? "Testando..." : "Testar Conexão"}
          </Button>

          <div className="pt-4 border-t">
            <Button
              onClick={handleImportData}
              disabled={isLoading}
              variant="secondary"
              className="w-full"
            >
              {isLoading ? "Importando..." : "Importar Dados do LocalStorage"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};