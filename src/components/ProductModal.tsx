import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Heart, Star, Check, ShieldCheck, Truck, RotateCcw, AlertCircle } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      setQuantity(1);
      trackAnalyticsEvent('visualizacao_de_produto', {
        produto_id: product.id,
        produto_nome: product.name,
        preco: product.price,
        categoria: product.category,
      });
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, product.stockSimulated));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    trackAnalyticsEvent('adicionar_ao_carrinho', {
      produto_id: product.id,
      produto_nome: product.name,
      preco: product.price,
      quantidade: quantity,
      origem: 'modal_produto',
    });
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-3xl bg-[#13161f] border border-[#272e3f] rounded-2xl shadow-2xl overflow-hidden z-10 text-white my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#1c202d] text-gray-400 hover:text-white hover:bg-[#252b3c] transition-colors z-20 border border-[#2d3447]"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Image */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-2xl bg-[#0c0d12] border border-[#252b3a] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.discountPercentage && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-amber-400 text-black font-extrabold text-xs shadow-md">
                    -{product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Prototype demonstrative badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1a1e2a] border border-[#272e3f] text-xs text-gray-400">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Simulação de produto para o protótipo V1 MGLS Imports (SENAI).</span>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-4 text-left">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                    {product.category.replace('-', ' ')}
                  </span>
                  <button
                    onClick={() => onToggleFavorite(product)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 transition-colors"
                    title="Favorito"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                <h2 className="font-display font-bold text-xl md:text-2xl text-white leading-snug">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-200">{product.rating}</span>
                  <span>({product.reviewCount} avaliações demonstrativas)</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="p-4 rounded-xl bg-[#181c26] border border-[#252c3c]">
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through block">
                    De: {formatPrice(product.originalPrice)}
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-2xl md:text-3xl text-white">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">À vista no PIX</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  ou até {product.installments.count}x de {formatPrice(product.installments.value)} sem juros no cartão
                </p>
              </div>

              {/* Short Description */}
              <div>
                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Descrição
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Features list */}
              <div>
                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Características principais
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="pt-2 border-t border-[#232837] space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#2f374a] rounded-xl bg-[#171a24] overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      className="px-3 py-2 text-gray-300 hover:text-white hover:bg-[#202533] transition-colors"
                      title="Diminuir"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-2 text-gray-300 hover:text-white hover:bg-[#202533] transition-colors"
                      title="Aumentar"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all transform active:scale-98 shadow-lg ${
                      addedAnimation
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                    }`}
                    id="modal-add-to-cart-btn"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Adicionado com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Adicionar ao carrinho</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulated Guarantees in Modal */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Compra Segura
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    Envio Rápido
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                    7 dias de troca
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
