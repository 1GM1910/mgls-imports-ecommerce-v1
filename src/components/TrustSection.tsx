import React from 'react';
import { ShieldCheck, HelpCircle, RefreshCw, Smartphone, Award, Star, Info } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#0e1017] border-b border-[#1b202c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181d29] border border-[#273042] text-xs font-semibold text-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Transparência & Experiência
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Por que comprar na MGLS Imports?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Pilares de confiabilidade projetados para entregar conveniência e modernidade em cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#141722] border border-[#222837] text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-white">
              Curadoria de Variedade
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Catálogo selecionado que vai de eletrônicos a utilidades domésticas e organizadores, trazendo novidades úteis com ótima relação custo-benefício.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#141722] border border-[#222837] text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-white">
              Política de Trocas Descomplicada
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Garantia de 7 dias para devoluções ou trocas após o recebimento, com suporte ágil para tirar dúvidas e acompanhar cada envio.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#141722] border border-[#222837] text-left space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-white">
              Navegação Fluida e Mobile First
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Plataforma projetada para proporcionar velocidade, busca intuitiva e carrinho instantâneo tanto no celular quanto no computador.
            </p>
          </div>
        </div>

        {/* Prototype Clarification Card */}
        <div className="mt-8 p-4 rounded-xl bg-[#12151f] border border-[#202738] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 text-left">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Nota de Transparência Acadêmica (SENAI):</strong> Todas as métricas, avaliações e selos acima pertencem ao protótipo de estudo V1 da MGLS Imports e não constituem garantias financeiras ou jurídicas reais.
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 shrink-0 font-medium">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Simulação de Satisfação 4.8 / 5.0</span>
          </div>
        </div>
      </div>
    </section>
  );
};
