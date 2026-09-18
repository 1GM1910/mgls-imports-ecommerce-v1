import React from 'react';
import { ShieldCheck, CheckCircle2, Headphones, Truck, Info } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: 'Compra segura',
      desc: 'Simulação com proteção de dados e ambiente seguro',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-amber-400" />,
      title: 'Produtos selecionados',
      desc: 'Curadoria com foco em qualidade e variedade útil',
    },
    {
      icon: <Headphones className="w-5 h-5 text-amber-400" />,
      title: 'Atendimento',
      desc: 'Canais de suporte dedicados e foco no cliente',
    },
    {
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      title: 'Envio para todo o Brasil',
      desc: 'Logística integrada e acompanhamento simulado',
    },
  ];

  return (
    <section className="bg-[#12141c] border-b border-[#1f2432] py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#171a23] border border-[#252a39] hover:border-[#353d52] transition-colors"
            >
              <div className="p-2 rounded-lg bg-[#202533] border border-[#2d3447] shrink-0">
                {item.icon}
              </div>
              <div className="space-y-0.5 text-left">
                <h3 className="font-semibold text-sm text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype Context Clarification as requested in item 7 */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>
            Informações e benefícios apresentados em caráter demonstrativo para o protótipo V1 da MGLS Imports (SENAI).
          </span>
        </div>
      </div>
    </section>
  );
};
