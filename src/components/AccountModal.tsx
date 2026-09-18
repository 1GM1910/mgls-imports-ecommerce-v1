import React from 'react';
import { X, User, Package, Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  favoritesCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md bg-[#131620] border border-[#262c3b] rounded-2xl shadow-2xl p-6 z-10 text-white space-y-6 text-left"
        role="dialog"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#212635]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-bold flex items-center justify-center text-sm shadow">
              AS
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Aluno / Visitante SENAI
              </h3>
              <span className="text-xs text-amber-400">Ambiente de Demonstração V1</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#1e2330] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info badges */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[#181c26] border border-[#283042] text-xs space-y-1">
            <span className="text-gray-400 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Favoritos
            </span>
            <span className="font-display font-bold text-base text-white block">
              {favoritesCount}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#181c26] border border-[#283042] text-xs space-y-1">
            <span className="text-gray-400 flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-emerald-400" />
              Pedidos Simulados
            </span>
            <span className="font-display font-bold text-base text-white block">
              1 (Demonstrativo)
            </span>
          </div>
        </div>

        {/* Academic Context Notice */}
        <div className="p-4 rounded-xl bg-[#171b26] border border-[#293245] space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Atividade Acadêmica SENAI</span>
          </div>
          <p className="leading-relaxed text-gray-400">
            Este protótipo foi estruturado com arquitetura pronta para validação de fluxos comerciais, testes de usabilidade e futura inserção do código do Google Analytics exigido na disciplina.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Endereço cadastrado: Av. Paulista, 1000 - São Paulo/SP</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Sessão segura sem armazenamento de credenciais</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#202533] hover:bg-[#293042] text-white text-xs font-semibold border border-[#343e54] transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
