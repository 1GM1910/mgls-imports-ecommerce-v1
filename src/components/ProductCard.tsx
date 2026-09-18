import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onViewProduct,
  onAddToCart,
}) => {
  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleProductClick = () => {
    trackAnalyticsEvent('clique_em_produto', {
      produto_id: product.id,
      produto_nome: product.name,
      preco: product.price,
      categoria: product.category,
    });
    onViewProduct(product);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackAnalyticsEvent('adicionar_ao_carrinho', {
      produto_id: product.id,
      produto_nome: product.name,
      preco: product.price,
      quantidade: 1,
      origem: 'card_catalogo',
    });
    onAddToCart(product);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackAnalyticsEvent(isFavorite ? 'remover_favorito' : 'adicionar_favorito', {
      produto_id: product.id,
      produto_nome: product.name,
    });
    onToggleFavorite(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#141720] rounded-2xl border border-[#232837] hover:border-amber-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Top badges & Favorite button */}
      <div className="relative aspect-square w-full bg-[#0c0d12] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discountPercentage && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-amber-400 text-black text-[11px] font-extrabold shadow-sm">
              <Zap className="w-3 h-3" />
              -{product.discountPercentage}%
            </span>
          )}
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md bg-[#1d222e]/90 backdrop-blur-sm border border-[#303749] text-gray-200 text-[10px] font-semibold">
              {product.badge}
            </span>
          )}
        </div>

        {/* Favorite heart button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            isFavorite
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-black/50 text-gray-300 hover:text-white hover:bg-black/80 border border-white/10'
          }`}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          id={`fav-btn-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Button overlay (appears on hover for desktop) */}
        <div className="absolute inset-x-3 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleProductClick}
            className="w-full py-2 px-3 rounded-xl bg-[#1c202a]/95 backdrop-blur-md text-white hover:bg-amber-400 hover:text-black font-semibold text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-all shadow-lg"
            id={`quickview-btn-${product.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver produto</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Simulated Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/90">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-500 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleProductClick}
            className="font-semibold text-sm text-gray-100 line-clamp-2 hover:text-amber-300 transition-colors cursor-pointer mb-2"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing & Installments */}
        <div className="pt-2 border-t border-[#1e2330]">
          {product.originalPrice && (
            <span className="block text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}

          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-lg text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">(fictício)</span>
          </div>

          <p className="text-[11px] text-gray-400 mt-0.5">
            ou {product.installments.count}x de {formatPrice(product.installments.value)}{' '}
            {product.installments.interestFree ? 'sem juros' : ''}
          </p>

          {/* Action Buttons for Mobile / Default */}
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <button
              onClick={handleProductClick}
              className="py-2 px-2 rounded-xl bg-[#1d212c] hover:bg-[#252b39] text-gray-200 text-xs font-semibold border border-[#2f3647] flex items-center justify-center gap-1 transition-colors"
              title="Ver detalhes do produto"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detalhes</span>
            </button>

            <button
              onClick={handleAddToCartClick}
              className="py-2 px-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm shadow-amber-400/20"
              title="Adicionar ao carrinho"
              id={`add-to-cart-${product.id}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
