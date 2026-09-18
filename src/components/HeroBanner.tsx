import React from 'react';
import { ArrowRight, Tag, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface HeroBannerProps {
  onExploreProducts: () => void;
  onExploreOffers: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreProducts,
  onExploreOffers,
}) => {
  const handleProductsClick = () => {
    trackAnalyticsEvent('clique_cta_hero', { cta: 'ver_produtos' });
    onExploreProducts();
  };

  const handleOffersClick = () => {
    trackAnalyticsEvent('clique_cta_hero', { cta: 'ver_ofertas' });
    onExploreOffers();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e1015] via-[#12151d] to-[#0c0d10] border-b border-[#1b1f2b] py-12 md:py-16">
      {/* Subtle geometric light accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181c26] border border-[#2b3244] text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-semibold text-white tracking-wide">MGLS IMPORTS V1</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">Variedade & Praticidade</span>
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-white">
              Tecnologia, utilidades e novidades{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                em um só lugar.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
              Produtos para facilitar sua rotina, com praticidade e uma experiência de compra simples.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={handleProductsClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-wide transition-all transform active:scale-98 shadow-lg shadow-amber-400/10 cursor-pointer"
                id="hero-cta-ver-produtos"
              >
                <span>Ver produtos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleOffersClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#181c26] hover:bg-[#202533] text-gray-200 hover:text-white font-semibold text-sm border border-[#2d3447] hover:border-amber-400/40 transition-all cursor-pointer"
                id="hero-cta-ver-ofertas"
              >
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Ver ofertas</span>
              </button>
            </div>

            {/* Key mini-stats / highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1b202c] max-w-lg">
              <div>
                <span className="block font-display font-bold text-lg text-white">+8</span>
                <span className="text-xs text-gray-400">Categorias gerais</span>
              </div>
              <div>
                <span className="block font-display font-bold text-lg text-white">100%</span>
                <span className="text-xs text-gray-400">Foco em facilidade</span>
              </div>
              <div>
                <span className="block font-display font-bold text-lg text-amber-300">V1</span>
                <span className="text-xs text-gray-400">Protótipo interativo</span>
              </div>
            </div>
          </div>

          {/* Featured Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#181b24] via-[#14161f] to-[#0f1118] border border-[#272d3d] p-6 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  Destaque da Coleção
                </span>
                <span className="text-xs text-gray-400 font-mono">ID: MGLS-EXP</span>
              </div>

              {/* Product Preview Composition */}
              <div className="relative aspect-video sm:aspect-4/3 w-full rounded-xl overflow-hidden bg-[#0c0d12] border border-[#232837] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Destaque MGLS Imports"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[11px] text-amber-300 uppercase tracking-wider font-semibold">
                      Eletrônicos & Áudio
                    </span>
                    <p className="font-semibold text-sm">Linha Bluetooth Noise Cancelling</p>
                  </div>
                  <span className="text-sm font-bold bg-black/70 px-2.5 py-1 rounded-md border border-gray-700">
                    R$ 189,90
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                Design minimalista, acabamento refinado e usabilidade pensada para simplificar a vida moderna.
              </p>

              <div className="mt-4 pt-3 border-t border-[#232838] flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Curadoria MGLS
                </span>
                <span className="text-gray-500">Protótipo acadêmico SENAI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
