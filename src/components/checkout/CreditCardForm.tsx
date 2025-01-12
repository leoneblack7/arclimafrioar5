import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface CreditCardData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  installments: string;
}

interface CreditCardFormProps {
  creditCardData: CreditCardData;
  setCreditCardData: (data: CreditCardData) => void;
}

export function CreditCardForm({ creditCardData, setCreditCardData }: CreditCardFormProps) {
  const installmentOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Dados do Cartão</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="cardNumber">Número do Cartão</label>
          <Input
            id="cardNumber"
            value={creditCardData.cardNumber}
            onChange={(e) =>
              setCreditCardData({ ...creditCardData, cardNumber: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="cardHolder">Nome no Cartão</label>
          <Input
            id="cardHolder"
            value={creditCardData.cardHolder}
            onChange={(e) =>
              setCreditCardData({ ...creditCardData, cardHolder: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="expiryDate">Data de Validade</label>
          <Input
            id="expiryDate"
            placeholder="MM/AA"
            value={creditCardData.expiryDate}
            onChange={(e) =>
              setCreditCardData({ ...creditCardData, expiryDate: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="cvv">CVV</label>
          <Input
            id="cvv"
            value={creditCardData.cvv}
            onChange={(e) =>
              setCreditCardData({ ...creditCardData, cvv: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2 col-span-2">
          <label htmlFor="installments">Parcelamento sem juros</label>
          <Select
            value={creditCardData.installments}
            onValueChange={(value) =>
              setCreditCardData({ ...creditCardData, installments: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o número de parcelas" />
            </SelectTrigger>
            <SelectContent>
              {installmentOptions.map((number) => (
                <SelectItem key={number} value={number.toString()}>
                  {number}x de R$ {(creditCardData.total / number).toFixed(2)} sem juros
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}