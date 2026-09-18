import React from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#090a0d] border-t border-[#1a1d26] text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#272b38] to-[#12141a] border border-[#373d4e] flex items-center justify-center font-display font-bold text-base text-white">
                <span className="bg-gradient-to-br from-white via-gray-200 to-amber-300 bg-clip-text text-transparent">
                  M
                </span>
              </div>
              <div>
                <span className="font-display font-extrabold text-lg tracking-tight text-white">
                  MGLS IMPORTS
                </span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider">
                  Variedade • Inovação • Conveniência
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Sua loja online com produtos selecionados em eletrônicos, utilidades para o lar, acessórios inteligentes e soluções práticas para o cotidiano.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-[#141720] border border-[#262c3b] flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-400/40 transition-colors"
                title="Instagram MGLS"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-[#141720] border border-[#262c3b] flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-400/40 transition-colors"
                title="Facebook MGLS"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-[#141720] border border-[#262c3b] flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-400/40 transition-colors"
                title="YouTube MGLS"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-lg bg-[#141720] border border-[#262c3b] flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-400/40 transition-colors"
                title="X / Twitter MGLS"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Institutional Links as requested */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="hover:text-amber-300 transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#atendimento" className="hover:text-amber-300 transition-colors">
                  Atendimento
                </a>
              </li>
              <li>
                <a href="#privacidade" className="hover:text-amber-300 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#termos" className="hover:text-amber-300 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#trocas" className="hover:text-amber-300 transition-colors">
                  Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-amber-300 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Links as requested */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Categorias
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('eletronicos');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Eletrônicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('casa-cozinha');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Casa
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('tecnologia');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Tecnologia
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('utilidades');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Utilidades
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('ofertas');
                    window.scrollTo({ top: 600, behavior: 'smooth' });
                  }}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors text-left"
                >
                  Ofertas
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and Academic Info */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Atendimento & Suporte
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contato@mglsimports.com.br (simulado)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>0800 123 4567 (Segunda a Sexta, 9h às 18h)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Brasil — Distribuição e Logística Nacional</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-[#131620] border border-[#232a39] space-y-1">
                <span className="text-[11px] font-semibold text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Projeto Acadêmico SENAI
                </span>
                <p className="text-[10px] text-gray-400 leading-snug">
                  Desenvolvido para o curso de E-commerce do SENAI com estrutura para integração do Google Analytics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with simulated payment methods & copyright */}
        <div className="mt-10 pt-6 border-t border-[#191c26] flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} MGLS Imports. Todos os direitos reservados. Protótipo Conceitual V1.
          </div>

          {/* Payment Badges Visual Mockup */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">Formas aceitas (simuladas):</span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-gray-300">
              <span className="px-1.5 py-0.5 rounded bg-[#181c26] border border-[#2b3345] text-emerald-400">
                PIX
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#181c26] border border-[#2b3345]">
                VISA
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#181c26] border border-[#2b3345]">
                MASTER
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#181c26] border border-[#2b3345]">
                ELO
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#181c26] border border-[#2b3345]">
                BOLETO
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
