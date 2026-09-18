import React from 'react';
import { CATEGORIES } from '../data/products';
import { FilterState, SortOption } from '../types';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Tag } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface CatalogFiltersProps {
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  totalResultsCount: number;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  filters,
  onChangeFilters,
  totalResultsCount,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    onChangeFilters({ ...filters, selectedCategory: newCat });
    trackAnalyticsEvent('filtro_categoria_alterado', { categoria: newCat });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value as FilterState['priceRange'];
    onChangeFilters({ ...filters, priceRange: range });
    trackAnalyticsEvent('filtro_preco_alterado', { faixa_preco: range });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as SortOption;
    onChangeFilters({ ...filters, sortBy: sort });
    trackAnalyticsEvent('ordenacao_alterada', { ordenacao: sort });
  };

  const handleToggleOffers = () => {
    const next = !filters.onlyOffers;
    onChangeFilters({ ...filters, onlyOffers: next });
    trackAnalyticsEvent('filtro_ofertas_toggle', { apenas_ofertas: next });
  };

  const handleResetFilters = () => {
    onChangeFilters({
      searchQuery: '',
      selectedCategory: 'all',
      priceRange: 'all',
      onlyOffers: false,
      sortBy: 'relevance',
    });
    trackAnalyticsEvent('filtros_limpos');
  };

  const hasActiveFilters =
    filters.selectedCategory !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.onlyOffers ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="bg-[#131620] border border-[#232838] rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Results Counter & Search Indicator */}
        <div className="flex items-center gap-2 text-left">
          <span className="font-display font-bold text-sm sm:text-base text-white">
            {totalResultsCount} {totalResultsCount === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </span>
          {filters.searchQuery && (
            <span className="text-xs text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
              Busca: &ldquo;{filters.searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter Select */}
          <div className="relative">
            <select
              value={filters.selectedCategory}
              onChange={handleCategoryChange}
              className="bg-[#181c26] text-xs text-gray-200 border border-[#2b3345] rounded-xl px-3 py-2 pr-8 focus:border-amber-400 focus:outline-none cursor-pointer appearance-none"
              id="filter-category-select"
            >
              <option value="all">Todas as Categorias</option>
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Price Range Select */}
          <div className="relative">
            <select
              value={filters.priceRange}
              onChange={handlePriceRangeChange}
              className="bg-[#181c26] text-xs text-gray-200 border border-[#2b3345] rounded-xl px-3 py-2 pr-8 focus:border-amber-400 focus:outline-none cursor-pointer appearance-none"
              id="filter-price-select"
            >
              <option value="all">Qualquer Preço</option>
              <option value="under-50">Até R$ 50,00</option>
              <option value="50-150">De R$ 50 a R$ 150</option>
              <option value="above-150">Acima de R$ 150,00</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Sort By Select */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="bg-[#181c26] text-xs text-gray-200 border border-[#2b3345] rounded-xl px-3 py-2 pr-8 focus:border-amber-400 focus:outline-none cursor-pointer appearance-none"
              id="filter-sort-select"
            >
              <option value="relevance">Mais relevantes</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Only Offers Toggle Button */}
          <button
            type="button"
            onClick={handleToggleOffers}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filters.onlyOffers
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
                : 'bg-[#181c26] text-gray-300 hover:text-white border border-[#2b3345] hover:border-amber-400/40'
            }`}
            id="filter-only-offers-btn"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Apenas Ofertas</span>
          </button>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-[#202533] border border-transparent hover:border-[#2e374a] transition-colors"
              title="Limpar todos os filtros"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
