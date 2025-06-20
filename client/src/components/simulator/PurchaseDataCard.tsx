import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Package, Truck, Receipt } from "lucide-react";
import { PurchaseData } from "@/types/simulator";

interface PurchaseDataCardProps {
  data: PurchaseData;
  onUpdate: (field: keyof PurchaseData, value: number) => void;
}

export const PurchaseDataCard = ({ data, onUpdate }: PurchaseDataCardProps) => {
  const handleInputChange = (field: keyof PurchaseData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(',', '.')) || 0;
    onUpdate(field, value);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/60 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-bold text-slate-900">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg">Dados de Compra</div>
            <div className="text-xs font-normal text-slate-600 mt-1">Custos e impostos de aquisição</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Cost */}
        <div className="bg-white rounded-xl p-4 border border-blue-200/60 shadow-sm">
          <Label htmlFor="costoPurchase" className="text-sm font-semibold text-slate-700 flex items-center mb-3">
            <Package className="w-4 h-4 mr-2 text-blue-600" />
            Custo de Compra (R$)
          </Label>
          <Input
            id="costoPurchase"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={data.costoPurchase || ''}
            onChange={handleInputChange('costoPurchase')}
            className="text-lg font-semibold border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        {/* Tax Grid */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 flex items-center">
            <Receipt className="w-4 h-4 mr-2 text-slate-600" />
            Impostos de Compra
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="ipiPurchase" className="text-xs font-medium text-slate-600 mb-2 block">
                IPI Compra (%)
              </Label>
              <Input
                id="ipiPurchase"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.ipiPurchase || ''}
                onChange={handleInputChange('ipiPurchase')}
                className="text-sm border-slate-200 focus:border-blue-500"
              />
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="icmsPurchase" className="text-xs font-medium text-slate-600 mb-2 block">
                ICMS Compra (%)
              </Label>
              <Input
                id="icmsPurchase"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.icmsPurchase || ''}
                onChange={handleInputChange('icmsPurchase')}
                className="text-sm border-slate-200 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="piscofinsPurchase" className="text-xs font-medium text-slate-600 mb-2 block">
                PIS/COFINS Compra (%)
              </Label>
              <Input
                id="piscofinsPurchase"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.piscofinsPurchase || ''}
                onChange={handleInputChange('piscofinsPurchase')}
                className="text-sm border-slate-200 focus:border-blue-500"
              />
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <Label htmlFor="freight" className="text-xs font-medium text-slate-600 mb-2 block flex items-center">
                <Truck className="w-3 h-3 mr-1" />
                Frete (%)
              </Label>
              <Input
                id="freight"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={data.freight || ''}
                onChange={handleInputChange('freight')}
                className="text-sm border-slate-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};