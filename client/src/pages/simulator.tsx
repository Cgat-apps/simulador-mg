import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Calculator, ArrowRight, Target, Edit, Building2 } from "lucide-react";
import { useSimulatorCalculations } from "@/hooks/useSimulatorCalculations";
import { PurchaseDataCard } from "@/components/simulator/PurchaseDataCard";
import { CMVCalculationCard } from "@/components/simulator/CMVCalculationCard";
import { SalesTaxesCard } from "@/components/simulator/SalesTaxesCard";
import { PricingResultsCard } from "@/components/simulator/PricingResultsCard";
import { ReverseSimulatorCard } from "@/components/simulator/ReverseSimulatorCard";
import { ExportModal } from "@/components/simulator/ExportModal";

export default function Simulator() {
  const [activeTab, setActiveTab] = useState<'direct' | 'reverse'>('direct');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const {
    simulationName,
    setSimulationName,
    purchaseData,
    salesData,
    targetPrice,
    calculatedValues,
    reverseCalculation,
    updatePurchaseData,
    updateSalesData,
    setTargetPrice,
    formatCurrency,
    formatPercentage,
  } = useSimulatorCalculations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Header with Gradient */}
      <header className="bg-white shadow-lg border-b border-slate-200/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
            {/* Brand Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Calculator className="text-white text-xl" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Building2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Simulador de Precificação ST
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <p className="text-sm font-medium text-slate-600">Filial MG • Operações de Atacado</p>
                  </div>
                </div>
              </div>
              
              {/* Simulation Name Input */}
              <div className="hidden lg:flex items-center space-x-3 ml-8 bg-slate-50 rounded-lg p-3 border border-slate-200">
                <Edit className="w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Nome da Simulação"
                  value={simulationName}
                  onChange={(e) => setSimulationName(e.target.value)}
                  className="w-72 border-0 bg-transparent text-sm font-medium placeholder:text-slate-400 focus:ring-0"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setIsExportModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2.5"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Simulação
              </Button>
            </div>
          </div>

          {/* Mobile Simulation Name Input */}
          <div className="lg:hidden pb-4">
            <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <Edit className="w-4 h-4 text-slate-500" />
              <Input
                placeholder="Nome da Simulação"
                value={simulationName}
                onChange={(e) => setSimulationName(e.target.value)}
                className="border-0 bg-transparent text-sm font-medium placeholder:text-slate-400 focus:ring-0"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Enhanced Tabs Navigation */}
        <div className="mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-2">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('direct')}
                className={`flex-1 flex items-center justify-center py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeTab === 'direct'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ArrowRight className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Simulação Direta</div>
                  <div className="text-xs opacity-80">Do custo ao preço final</div>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reverse')}
                className={`flex-1 flex items-center justify-center py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeTab === 'reverse'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Target className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Simulação Reversa</div>
                  <div className="text-xs opacity-80">Do preço alvo ao custo</div>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Direct Simulation Tab */}
        {activeTab === 'direct' && (
          <div className="space-y-8">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Simulação Direta</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Calcule o preço final a partir dos custos de compra, impostos e margens desejadas
              </p>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Dados de Entrada</h3>
                <p className="text-slate-600 text-sm">Preencha as informações de compra e venda</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PurchaseDataCard data={purchaseData} onUpdate={updatePurchaseData} />
                <SalesTaxesCard data={salesData} onUpdate={updateSalesData} />
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Resultados dos Cálculos</h3>
                <p className="text-slate-600 text-sm">Valores calculados automaticamente</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CMVCalculationCard values={calculatedValues} formatCurrency={formatCurrency} />
                <PricingResultsCard 
                  values={calculatedValues} 
                  formatCurrency={formatCurrency} 
                  formatPercentage={formatPercentage} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Reverse Simulation Tab */}
        {activeTab === 'reverse' && (
          <div className="space-y-8">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Simulação Reversa</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Determine o custo ideal e margens necessárias a partir de um preço alvo desejado
              </p>
            </div>

            {/* Reverse Simulation Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
              <ReverseSimulatorCard
                targetPrice={targetPrice}
                reverseCalculation={reverseCalculation}
                onTargetPriceChange={setTargetPrice}
                formatCurrency={formatCurrency}
                formatPercentage={formatPercentage}
              />
            </div>
          </div>
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        simulationName={simulationName}
        purchaseData={purchaseData}
        salesData={salesData}
        calculatedValues={calculatedValues}
        reverseCalculation={reverseCalculation}
        targetPrice={targetPrice}
      />
    </div>
  );
}