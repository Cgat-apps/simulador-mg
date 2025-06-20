import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Info, TrendingUp } from "lucide-react";
import { CalculatedValues } from "@/types/simulator";

interface CMVCalculationCardProps {
  values: CalculatedValues;
  formatCurrency: (value: number) => string;
}

export const CMVCalculationCard = ({ values, formatCurrency }: CMVCalculationCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/60 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg font-bold text-slate-900">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg">Cálculo do CMV</div>
            <div className="text-xs font-normal text-slate-600 mt-1">Custo da Mercadoria Vendida</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Intermediate Values */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-slate-600" />
            Valores Intermediários
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs font-medium text-slate-600 mb-1">Valor do IPI</div>
              <div className="text-sm font-bold text-slate-900">{formatCurrency(values.ipiValue)}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs font-medium text-slate-600 mb-1">Valor ICMS Compra</div>
              <div className="text-sm font-bold text-slate-900">{formatCurrency(values.icmsValue)}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs font-medium text-slate-600 mb-1">Valor PIS/COFINS</div>
              <div className="text-sm font-bold text-slate-900">{formatCurrency(values.piscofinsValue)}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="text-xs font-medium text-slate-600 mb-1">Valor do Frete</div>
              <div className="text-sm font-bold text-slate-900">{formatCurrency(values.freightValue)}</div>
            </div>
          </div>
        </div>

        {/* CMV Final Highlight */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium opacity-90 mb-1">CMV Final</div>
              <div className="text-2xl font-bold">{formatCurrency(values.cmvFinal)}</div>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-xs opacity-80 mb-2">Fórmula:</div>
            <div className="text-xs font-medium">Custo + IPI - ICMS - PIS/COFINS + Frete</div>
          </div>
        </div>

        {/* Formula Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <div className="font-semibold mb-1">Observação sobre PIS/COFINS:</div>
              <div>O cálculo utiliza a base: (Custo + IPI - ICMS Compra) × % PIS/COFINS</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};