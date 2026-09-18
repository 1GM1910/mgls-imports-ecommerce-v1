import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
  onViewProduct,
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12141c] border-l border-[#222736] text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#212635] flex items-center justify-between bg-[#151822]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-white">
                  Meus Favoritos
                </h2>
                <span className="text-xs text-gray-400">
                  {favorites.length} {favorites.length === 1 ? 'item salvo' : 'itens salvos'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#202533] transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-gray-400">
                <div className="w-16 h-16 rounded-2xl bg-[#1c202d] border border-[#2c3345] flex items-center justify-center text-gray-500">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold text-white text-base">Nenhum favorito ainda</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Toque no coração dos produtos para salvá-los e acessá-los rapidamente depois.
                  </p>
                </div>
              </div>
            ) : (
              favorites.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-[#171a23] border border-[#262c3b] relative group text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#0d0e13] border border-[#293041] shrink-0 cursor-pointer"
                    onClick={() => {
                      onViewProduct(product);
                      onClose();
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => {
                          onViewProduct(product);
                          onClose();
                        }}
                        className="text-xs font-semibold text-white line-clamp-1 cursor-pointer hover:text-amber-300"
                      >
                        {product.name}
                      </h4>
                      <span className="font-display font-bold text-sm text-white block mt-0.5">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          trackAnalyticsEvent('adicionar_ao_carrinho', {
                            produto_id: product.id,
                            origem: 'drawer_favoritos',
                          });
                        }}
                        className="py-1 px-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Comprar</span>
                      </button>

                      <button
                        onClick={() => onRemoveFavorite(product)}
                        className="py-1 px-2 rounded-lg bg-[#222736] hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 text-xs transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
