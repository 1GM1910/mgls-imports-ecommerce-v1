import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingThreshold = 199.0;
  const progressToFreeShipping = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100
  );
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  const handleCheckoutClick = () => {
    trackAnalyticsEvent('inicio_de_checkout', {
      valor_total: subtotal,
      total_itens: totalItemsCount,
      produtos: cartItems.map((item) => ({
        id: item.product.id,
        nome: item.product.name,
        preco: item.product.price,
        quantidade: item.quantity,
      })),
    });
    onProceedToCheckout();
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    trackAnalyticsEvent('remover_do_carrinho', {
      produto_id: productId,
      produto_nome: productName,
    });
    onRemoveItem(productId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12141c] border-l border-[#222736] text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#212635] flex items-center justify-between bg-[#151822]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-white">
                  Meu Carrinho
                </h2>
                <span className="text-xs text-gray-400">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} adicionados
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#202533] transition-colors border border-transparent hover:border-[#2f364a]"
              title="Fechar"
              id="close-cart-drawer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Simulator Bar */}
          <div className="bg-[#171a24] px-5 py-3 border-b border-[#222736] text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-300">
                  <span>
                    Faltam <strong className="text-amber-400">{formatPrice(remainingForFreeShipping)}</strong> para{' '}
                    <strong className="text-white">Frete Grátis</strong>
                  </span>
                  <span className="text-gray-400">{Math.round(progressToFreeShipping)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#272c3d] overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Parabéns! Você ganhou Frete Grátis simulado!</span>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-gray-400">
                <div className="w-16 h-16 rounded-2xl bg-[#1c202d] border border-[#2c3345] flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold text-white text-base">Seu carrinho está vazio</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Explore os produtos em destaque da MGLS Imports e adicione seus itens favoritos.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#202533] hover:bg-[#282f42] text-white text-xs font-semibold border border-[#343d52] transition-colors"
                >
                  Continuar navegando
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-[#171a23] border border-[#262c3b] relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-[#0d0e13] border border-[#293041] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div className="pr-6">
                      <h4 className="text-xs font-semibold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                        {item.product.category.replace('-', ' ')}
                      </span>
                      <span className="font-display font-bold text-sm text-white mt-1 block">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#232837]">
                      <div className="flex items-center border border-[#2e3649] rounded-lg bg-[#11131a]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-[#202533] transition-colors rounded-l"
                          title="Diminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-white min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white hover:bg-[#202533] transition-colors rounded-r"
                          title="Aumentar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-amber-300">
                        Total: {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-rose-400 transition-colors p-1"
                    title="Remover item"
                    id={`cart-remove-${item.product.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#222736] bg-[#151822] space-y-3">
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete estimado</span>
                  <span className="text-emerald-400 font-semibold">
                    {subtotal >= freeShippingThreshold ? 'Grátis' : 'R$ 15,90 (simulado)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#252b3c]">
                  <span>Total Previsto</span>
                  <span className="font-display text-base text-amber-400">
                    {formatPrice(
                      subtotal + (subtotal >= freeShippingThreshold ? 0 : 15.9)
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all transform active:scale-98 shadow-lg shadow-amber-400/20 cursor-pointer"
                id="cart-checkout-btn"
              >
                <span>Finalizar compra</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protótipo funcional • Checkout demonstrativo V1</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
