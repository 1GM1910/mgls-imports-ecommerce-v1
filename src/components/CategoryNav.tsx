import React from 'react';
import { CATEGORIES } from '../data/products';
import { Sparkles, Tag, Smartphone, Home, Wrench, Layers, Cpu, LayoutGrid } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'all':
        return <LayoutGrid className="w-3.5 h-3.5" />;
      case 'eletronicos':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'celulares-acessorios':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'casa-cozinha':
        return <Home className="w-3.5 h-3.5" />;
      case 'utilidades':
        return <Wrench className="w-3.5 h-3.5" />;
      case 'organizacao':
        return <Layers className="w-3.5 h-3.5" />;
      case 'tecnologia':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'ofertas':
        return <Tag className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <LayoutGrid className="w-3.5 h-3.5" />;
    }
  };

  const handleCategoryClick = (catId: string, label: string) => {
    onSelectCategory(catId);
    trackAnalyticsEvent('navegacao_categoria', {
      categoria_id: catId,
      categoria_nome: label,
    });
  };

  return (
    <nav className="w-full bg-[#101217] border-b border-[#1b1e27] overflow-x-auto no-scrollbar py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 min-w-max">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          const isOffer = category.id === 'ofertas';

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.label)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? isOffer
                    ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
                    : 'bg-white text-[#0e1015] font-semibold shadow-sm'
                  : isOffer
                  ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20'
                  : 'text-gray-300 hover:text-white hover:bg-[#1c202a] border border-transparent'
              }`}
              id={`cat-nav-${category.id}`}
            >
              {getCategoryIcon(category.id)}
              <span>{category.label}</span>
              {isOffer && !isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
