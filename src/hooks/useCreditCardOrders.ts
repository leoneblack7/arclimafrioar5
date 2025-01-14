import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreditCardOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["credit-card-orders"],
    queryFn: async () => {
      const response = await fetch('api/orders/read.php');
      const allOrders = await response.json();
      return allOrders
        .filter((order: any) => order.payment_method === 'credit')
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  });

  const handleCopyData = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Dados copiados para a área de transferência"
    });
  };

  const handleDelete = async (orderId: string) => {
    try {
      const response = await fetch('api/orders/delete.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId })
      });

      if (response.ok) {
        toast({
          title: "Pedido deletado com sucesso!"
        });
        queryClient.invalidateQueries({ queryKey: ["credit-card-orders"] });
      } else {
        throw new Error('Falha ao deletar pedido');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Erro ao deletar pedido",
        variant: "destructive"
      });
    }
  };

  return {
    orders,
    isLoading,
    handleCopyData,
    handleDelete
  };
};