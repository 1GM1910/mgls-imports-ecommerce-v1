import React from 'react';
import { Product } from '../types';
import { Tag, Sparkles, ArrowRight, Zap, Flame, Clock } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface OffersSectionProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAllOffers: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  products,
  onViewProduct,
  onAddToCart,
  onViewAllOffers,
}) => {
  const offerProducts = products.filter((p) => p.isOffer).slice(0, 4);

  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleOfferItemClick = (product: Product) => {
    trackAnalyticsEvent('clique_em_oferta', {
      produto_id: product.id,
      produto_nome: product.name,
      desconto: product.discountPercentage,
      preco_promocional: product.price,
    });
    onViewProduct(product);
  };

  const handleViewAllOffers = () => {
    trackAnalyticsEvent('clique_ver_todas_ofertas', {
      origem: 'secao_ofertas_mgls',
    });
    onViewAllOffers();
  };

  return (
    <section className="py-12 bg-gradient-to-b from-[#0c0d10] via-[#131620] to-[#0c0d10] border-y border-[#1c212e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="text-left space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Seleção Especial
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Ofertas MGLS
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Descontos pontuais e oportunidades selecionadas em nosso catálogo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1a1e2a] border border-[#272e40] text-xs text-gray-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Ofertas rotativas simuladas</span>
            </div>

            <button
              onClick={handleViewAllOffers}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-all transform active:scale-95 shadow-md shadow-amber-400/20"
              id="cta-ver-todas-ofertas"
            >
              <span>Ver todas as ofertas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {offerProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOfferItemClick(product)}
              className="group relative rounded-2xl bg-[#151923] border border-[#272e3f] hover:border-amber-400/60 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/70 cursor-pointer flex flex-col justify-between text-left"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#0c0d12] mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-400 text-black text-[11px] font-black flex items-center gap-1 shadow">
                    <Zap className="w-3 h-3" />
                    -{product.discountPercentage}% OFF
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold text-amber-400/90 tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>
                <h3 className="font-semibold text-xs text-white line-clamp-2 mt-1 group-hover:text-amber-300 transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-[#232938] flex items-center justify-between">
                <div>
                  {product.originalPrice && (
                    <span className="text-[11px] text-gray-400 line-through block leading-none mb-1">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="font-display font-bold text-base text-white">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    trackAnalyticsEvent('adicionar_ao_carrinho', {
                      produto_id: product.id,
                      produto_nome: product.name,
                      preco: product.price,
                      origem: 'secao_ofertas_mgls',
                    });
                    onAddToCart(product);
                  }}
                  className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold transition-transform active:scale-90"
                  title="Adicionar ao carrinho"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
