import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

export const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      console.log("BannerManager - Banners carregados:", data);
      setBanners(data || []);
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      try {
        // Upload da imagem para o Storage do Supabase
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('banners')
          .upload(`banner-${Date.now()}`, file);

        if (uploadError) throw uploadError;

        // Obter URL pública da imagem
        const { data: { publicUrl } } = supabase.storage
          .from('banners')
          .getPublicUrl(uploadData.path);

        // Criar novo banner no banco
        const { error: insertError } = await supabase
          .from('banners')
          .insert([{ image_url: publicUrl, active: true }]);

        if (insertError) throw insertError;

        toast.success("Banner adicionado e ativado com sucesso!");
        loadBanners();
      } catch (error) {
        console.error('Erro ao fazer upload do banner:', error);
        toast.error("Erro ao fazer upload do banner");
      }
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Banner removido com sucesso!");
      loadBanners();
    } catch (error) {
      console.error('Erro ao remover banner:', error);
      toast.error("Erro ao remover o banner");
    }
  };

  const toggleBannerStatus = async (id: string, newStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({ active: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast.success(newStatus ? "Banner ativado com sucesso!" : "Banner desativado com sucesso!");
      loadBanners();
    } catch (error) {
      console.error('Erro ao atualizar status do banner:', error);
      toast.error("Erro ao atualizar o status do banner");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
      
      <div className="space-y-4 max-w-md">
        <div>
          <Label>Upload do Banner</Label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button onClick={handleClickUpload} className="w-full">
            Escolher arquivo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded-lg p-4 space-y-2">
            <img 
              src={banner.image_url} 
              alt="Banner preview" 
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="flex justify-between items-center gap-2">
              <Button
                variant={banner.active ? "secondary" : "default"}
                className="flex-1"
                onClick={() => toggleBannerStatus(banner.id, !banner.active)}
              >
                {banner.active ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Desativar
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Ativar
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(banner.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};