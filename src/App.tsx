import React, { useState, useMemo, useRef } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, FilterState } from './types';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { BenefitsBar } from './components/BenefitsBar';
import { OffersSection } from './components/OffersSection';
import { CatalogFilters } from './components/CatalogFilters';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { TrustSection } from './components/TrustSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { AnalyticsMonitor } from './components/AnalyticsMonitor';
import { Sparkles, PackageSearch, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { trackAnalyticsEvent } from './utils/analytics';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'all',
    priceRange: 'all',
    onlyOffers: false,
    sortBy: 'relevance',
  });

  // User Interactive State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals / Drawers State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const catalogRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    showToast(`${product.name.slice(0, 32)}... adicionado ao carrinho!`);
  };

  const handleUpdateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Favorite operations
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Produto removido dos favoritos');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('Produto adicionado aos favoritos!');
        return [...prev, product];
      }
    });
  };

  // Modal actions
  const handleOpenProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleScrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreOffers = () => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: 'all',
      onlyOffers: true,
      searchQuery: '',
    }));
    handleScrollToCatalog();
  };

  const handleSelectCategoryFromNav = (categoryId: string) => {
    if (categoryId === 'ofertas') {
      setFilters((prev) => ({
        ...prev,
        selectedCategory: 'all',
        onlyOffers: true,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        selectedCategory: categoryId,
        onlyOffers: false,
      }));
    }
    handleScrollToCatalog();
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search Filter
        if (filters.searchQuery.trim() !== '') {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchDesc = product.shortDescription.toLowerCase().includes(q);
          const matchFeature = product.features.some((f) =>
            f.toLowerCase().includes(q)
          );
          if (!matchName && !matchCat && !matchDesc && !matchFeature) {
            return false;
          }
        }

        // Category Filter
        if (filters.selectedCategory !== 'all') {
          if (product.category !== filters.selectedCategory) {
            return false;
          }
        }

        // Only Offers Filter
        if (filters.onlyOffers) {
          if (!product.isOffer) {
            return false;
          }
        }

        // Price Range Filter
        if (filters.priceRange === 'under-50') {
          if (product.price > 50) return false;
        } else if (filters.priceRange === '50-150') {
          if (product.price < 50 || product.price > 150) return false;
        } else if (filters.priceRange === 'above-150') {
          if (product.price < 150) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (filters.sortBy === 'price-desc') {
          return b.price - a.price;
        }
        return 0; // relevance
      });
  }, [products, filters]);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f3f4f6] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-400 text-black font-bold text-xs shadow-2xl transition-all animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => {
          setFilters((prev) => ({ ...prev, searchQuery: q }));
          if (q.trim().length > 2) {
            trackAnalyticsEvent('pesquisa_digitada', { termo: q });
          }
        }}
        cartCount={cartTotalItems}
        cartSubtotal={cartSubtotal}
        wishlistCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Categories Horizontal Bar */}
      <CategoryNav
        selectedCategory={
          filters.onlyOffers ? 'ofertas' : filters.selectedCategory
        }
        onSelectCategory={handleSelectCategoryFromNav}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner
          onExploreProducts={handleScrollToCatalog}
          onExploreOffers={handleExploreOffers}
        />

        {/* Benefits bar */}
        <BenefitsBar />

        {/* Offers Section */}
        <OffersSection
          products={products}
          onViewProduct={handleOpenProductDetail}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onViewAllOffers={handleExploreOffers}
        />

        {/* Main Products Catalog Section */}
        <section
          ref={catalogRef}
          id="catalogo-produtos"
          className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left scroll-mt-24"
        >
          {/* Section Header */}
          <div className="mb-6 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                Catálogo Diversificado
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Produtos em destaque
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Eletrônicos, casa, utilidades e itens para organização selecionados para você.
            </p>
          </div>

          {/* Filters and Sorting Bar */}
          <CatalogFilters
            filters={filters}
            onChangeFilters={setFilters}
            totalResultsCount={filteredProducts.length}
          />

          {/* Product Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#131620] border border-[#232838] space-y-4 my-8">
              <div className="w-16 h-16 rounded-2xl bg-[#191d29] border border-[#273042] text-amber-400 flex items-center justify-center mx-auto">
                <PackageSearch className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-white">
                  Nenhum produto encontrado.
                </h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Não encontramos itens correspondentes à sua busca ou aos filtros aplicados. Tente buscar por outros termos como &ldquo;fone&rdquo;, &ldquo;carregador&rdquo;, &ldquo;casa&rdquo; ou &ldquo;smart tag&rdquo;.
                </p>
              </div>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    selectedCategory: 'all',
                    priceRange: 'all',
                    onlyOffers: false,
                    sortBy: 'relevance',
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-all shadow-md shadow-amber-400/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar filtros e ver todos</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.some((f) => f.id === product.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onViewProduct={handleOpenProductDetail}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Trust & Commercial Experience */}
        <TrustSection />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategoryFromNav} />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        isFavorite={
          selectedProduct
            ? favorites.some((f) => f.id === selectedProduct.id)
            : false
        }
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Demonstrative Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onOrderCompleted={() => {
          setCart([]);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onViewProduct={handleOpenProductDetail}
      />

      {/* Account Info Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        favoritesCount={favorites.length}
      />

      {/* Real-time Google Analytics Event Monitor for SENAI evaluation */}
      <AnalyticsMonitor />
    </div>
  );
}
