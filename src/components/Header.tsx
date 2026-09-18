import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, X, Menu, ShieldCheck, Sparkles } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  cartSubtotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAnalyticsEvent('pesquisa_realizada', {
      termo_busca: searchQuery,
      origem: 'barra_header',
    });
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0e12]/95 backdrop-blur-md border-b border-[#1f232e] text-white">
      {/* Top Academic Banner */}
      <div className="bg-[#141720] border-b border-[#1f232e] py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#94a3b8]">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium text-[11px]">
              <Sparkles className="w-3 h-3" />
              Atividade SENAI E-commerce
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-gray-300">
              Protótipo Conceitual V1 — Ambiente Demonstrativo
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#94a3b8] text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Ambiente Seguro
            </span>
            <span className="hidden md:inline">Frete com simulação para todo o Brasil</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onSearchChange('');
              }}
              className="group text-left focus:outline-none"
              title="MGLS Imports - Início"
              id="header-logo-btn"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#272b38] to-[#12141a] border border-[#373d4e] flex items-center justify-center font-display font-bold text-lg text-white shadow-inner group-hover:border-amber-400/50 transition-colors">
                  <span className="bg-gradient-to-br from-white via-gray-200 to-amber-300 bg-clip-text text-transparent">
                    M
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      MGLS
                    </span>
                    <span className="font-display text-sm tracking-wider uppercase font-semibold text-[#94a3b8] px-1.5 py-0.5 rounded bg-[#1c202a] border border-[#2d3342]">
                      IMPORTS
                    </span>
                  </div>
                  <p className="text-[10px] text-[#6b7280] tracking-wide uppercase font-medium">
                    Variedade & Tecnologia
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Busque produtos na MGLS Imports (ex: fone, casa, carregador...)"
                  className="w-full bg-[#13151c] hover:bg-[#161822] focus:bg-[#161822] text-white placeholder-[#64748b] text-sm pl-11 pr-10 py-2.5 rounded-xl border border-[#272b3a] focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 transition-all outline-none"
                  id="search-input-desktop"
                />
                <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    title="Limpar busca"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Action Icons: Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account Button */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#1a1d26] transition-colors border border-transparent hover:border-[#2a2f3d]"
              id="header-account-btn"
              title="Minha Conta"
            >
              <div className="w-8 h-8 rounded-lg bg-[#181b24] border border-[#282d3b] flex items-center justify-center text-gray-300">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <span className="text-gray-400 block text-[10px]">Olá, Visitante</span>
                <span className="font-semibold text-white">Minha Conta</span>
              </div>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-[#1a1d26] transition-colors border border-transparent hover:border-[#2a2f3d]"
              id="header-wishlist-btn"
              title="Favoritos"
            >
              <Heart className="w-5 h-5 text-gray-300 hover:text-rose-400 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#1c202a] to-[#252a37] hover:from-[#252a37] hover:to-[#2e3444] text-white border border-[#353b4c] hover:border-amber-400/40 transition-all shadow-sm group"
              id="header-cart-btn"
              title="Ver Carrinho"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:block text-left leading-none">
                <span className="text-[10px] text-gray-400 block">Carrinho</span>
                <span className="text-xs font-bold text-amber-300">
                  {cartSubtotal > 0
                    ? `R$ ${cartSubtotal.toFixed(2).replace('.', ',')}`
                    : 'R$ 0,00'}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-xl text-gray-300 hover:bg-[#1a1d26]"
              title="Menu"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Busque produtos na MGLS Imports..."
              className="w-full bg-[#13151c] text-white placeholder-[#64748b] text-sm pl-10 pr-9 py-2.5 rounded-xl border border-[#272b3a] focus:border-amber-400/70 focus:outline-none"
              id="search-input-mobile"
            />
            <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-2.5 p-1 text-gray-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};
