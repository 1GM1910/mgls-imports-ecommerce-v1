import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    trackAnalyticsEvent('cadastro_newsletter', {
      email_inserido: email,
      timestamp: new Date().toISOString(),
    });

    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-14 bg-gradient-to-b from-[#10131c] via-[#141722] to-[#0c0d10] border-b border-[#1b202c]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Clube de Vantagens MGLS
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Receba novidades e ofertas
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            Cadastre-se para receber em primeira mão lançamentos de tecnologia, utilidades domésticas e condições exclusivas da MGLS Imports.
          </p>
        </div>

        {isSubscribed ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Obrigado! E-mail cadastrado com sucesso no protótipo.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="w-full bg-[#181c26] border border-[#2b3345] rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none transition-colors"
                id="newsletter-email-input"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all transform active:scale-95 shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2"
              id="newsletter-submit-btn"
            >
              <span>Quero receber novidades</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-gray-400">
          Sem spam. Seus dados simulados são utilizados apenas para demonstração acadêmica.
        </p>
      </div>
    </section>
  );
};
