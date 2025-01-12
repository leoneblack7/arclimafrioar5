import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { ProductScraperService, ScrapedProduct } from "@/utils/ProductScraperService";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  active: boolean;
}

// Dados temporários - serão substituídos pela integração com backend
const initialProducts: Product[] = [
  {
    id: 1,
    title: "Ar Condicionado Split Inverter 12000 BTUs",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Split Inverter com tecnologia de última geração, economia de energia e controle via WiFi",
    active: true,
  },
  {
    id: 2,
    title: "Ar Condicionado Portátil 9000 BTUs",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Solução portátil ideal para ambientes sem instalação fixa, com controle remoto e timer",
    active: true,
  },
  {
    id: 3,
    title: "Split Hi-Wall Premium 18000 BTUs",
    price: 3299.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Sistema avançado de filtragem, operação silenciosa e máxima eficiência energética",
    active: true,
  },
  {
    id: 4,
    title: "Multi Split Inverter 24000 BTUs",
    price: 4599.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Sistema multi split para até 3 ambientes, com tecnologia inverter e controle individual",
    active: true,
  },
  {
    id: 5,
    title: "Ar Condicionado Cassete 36000 BTUs",
    price: 5999.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Ideal para ambientes comerciais, com distribuição uniforme do ar e instalação no teto",
    active: true,
  },
  {
    id: 6,
    title: "Split Piso Teto 48000 BTUs",
    price: 7299.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Versátil e potente, perfeito para grandes ambientes comerciais ou industriais",
    active: true,
  }
];

export default function Admin() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/admin");
      toast.success("Login realizado com sucesso!");
    }
  };

  const handleToggleActive = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, active: !product.active }
        : product
    ));
    toast.success("Status do produto atualizado!");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts(products.map(product =>
      product.id === editingProduct.id ? editingProduct : product
    ));
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter(product => product.id !== productId));
      toast.success("Produto removido com sucesso!");
    }
  };

  const handleImportProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);

    try {
      const scrapedProduct = await ProductScraperService.scrapeProduct(importUrl);
      
      if (scrapedProduct) {
        const newProduct = {
          id: products.length + 1,
          title: scrapedProduct.title,
          price: scrapedProduct.price,
          image: scrapedProduct.images[0] || '',
          description: scrapedProduct.description,
          active: true
        };

        setProducts([...products, newProduct]);
        setImportUrl("");
        toast.success("Produto importado com sucesso!");
      }
    } catch (error) {
      console.error('Error importing product:', error);
      toast.error("Erro ao importar produto. Verifique o link e tente novamente.");
    } finally {
      setIsImporting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Usuário
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button onClick={logout} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{products.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {products.filter(p => p.active).length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos Inativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {products.filter(p => !p.active).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Importar Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleImportProduct} className="flex gap-4">
              <Input
                type="url"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="Cole o link do produto aqui"
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isImporting}>
                {isImporting ? "Importando..." : "Importar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.active}
                        onCheckedChange={() => handleToggleActive(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título</label>
                  <Input
                    value={editingProduct.title}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preço</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição</label>
                  <Input
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL da Imagem</label>
                  <Input
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Salvar Alterações
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
