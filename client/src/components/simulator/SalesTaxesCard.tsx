import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, CreditCard, TrendingUp, Settings } from "lucide-react";
import { SalesData, PAYMENT_CONDITIONS } from "@/types/simulator";

interface SalesTaxesCardProps {
  data: SalesData;
  onUpdate: (field: keyof SalesData, value: number) => void;
}

export const SalesTaxesCard = ({ data, onUpdate }: SalesTaxesCardProps) => {
  const handleInputChange = (field: keyof SalesData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(',', '.')) || 0;
    onUpdate(field, value);
  };

  const handlePaymentConditionChange = (value: string) => {
    onUpdate('paymentCondition', parseFloat(value));
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-bold text-slate-900">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <Percent className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg">Impostos e Margens</div>
            <div className="text-xs font-normal text-slate-600 mt-1">Configurações de venda</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sales Taxes */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 flex items-center">
            <Percent className="w-4 h-4 mr-2 text-slate-600" />
            Impostos de Venda
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="icmsSale" className="text-xs font-medium text-slate-600 mb-2 block">
                ICMS Venda (%)
              </Label>
              <Input
                id="icmsSale"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.icmsSale || ''}
                onChange={handleInputChange('icmsSale')}
                className="text-sm border-slate-200 focus:border-amber-500"
              />
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="piscofinsSale" className="text-xs font-medium text-slate-600 mb-2 block">
                PIS/COFINS Venda (%)
              </Label>
              <Input
                id="piscofinsSale"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.piscofinsSale || ''}
                onChange={handleInputChange('piscofinsSale')}
                className="text-sm border-slate-200 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Margins and Adjustments */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-slate-600" />
            Margens e Ajustes
          </h4>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="devolution" className="text-xs font-medium text-slate-600 mb-2 block">
                Devolução (%)
              </Label>
              <Input
                id="devolution"
                type="number"
                step="0.01"
                value={data.devolution}
                onChange={handleInputChange('devolution')}
                className="text-sm border-slate-200 focus:border-amber-500"
              />
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="grossMargin" className="text-xs font-medium text-slate-600 mb-2 block">
                Margem Bruta (%)
              </Label>
              <Input
                id="grossMargin"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.grossMargin || ''}
                onChange={handleInputChange('grossMargin')}
                className="text-sm border-slate-200 focus:border-amber-500"
              />
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="flex" className="text-xs font-medium text-slate-600 mb-2 block">
                Flex (%)
              </Label>
              <Input
                id="flex"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.flex || ''}
                onChange={handleInputChange('flex')}
                className="text-sm border-slate-200 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* ST and Payment */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 flex items-center">
            <Settings className="w-4 h-4 mr-2 text-slate-600" />
            Configurações Especiais
          </h4>
          
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <Label htmlFor="mva" className="text-xs font-medium text-slate-600 mb-2 block">
              MVA - Margem de Valor Agregado (%)
            </Label>
            <Input
              id="mva"
              type="number"
              step="0.01"
              value={data.mva}
              onChange={handleInputChange('mva')}
              className="text-sm border-slate-200 focus:border-amber-500"
            />
          </div>

          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <Label className="text-xs font-medium text-slate-600 mb-2 block flex items-center">
              <CreditCard className="w-3 h-3 mr-1" />
              Condição de Pagamento
            </Label>
            <Select 
              value={data.paymentCondition.toString()} 
              onValueChange={handlePaymentConditionChange}
            >
              <SelectTrigger className="text-sm border-slate-200 focus:border-amber-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_CONDITIONS.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value.toString()}>
                    {condition.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};