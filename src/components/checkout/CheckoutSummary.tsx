import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CheckoutSummaryProps {
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity?: number;
    image: string;
  }>;
  total: number;
}

export function CheckoutSummary({ items, total }: CheckoutSummaryProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Produtos no Carrinho</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Quantidade: {item.quantity}
                </p>
                <p className="font-medium">
                  {(item.price * (item.quantity || 1)).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 font-bold">
            <span>Total:</span>
            <span>
              {total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}