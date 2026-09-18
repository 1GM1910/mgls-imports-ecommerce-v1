import React, { useState, useEffect } from 'react';
import { CartItem, CheckoutForm } from '../types';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  User,
  MapPin,
  Truck,
  CreditCard,
  FileText,
  ArrowRight,
  ArrowLeft,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { trackAnalyticsEvent } from '../utils/analytics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [orderId, setOrderId] = useState<string>('');
  const [copiedPix, setCopiedPix] = useState(false);

  const [formData, setFormData] = useState<CheckoutForm>({
    name: 'Carlos Mendes (Simulado)',
    email: 'carlos.mendes@exemplo.com.br',
    phone: '(11) 98765-4321',
    cep: '01310-100',
    address: 'Av. Paulista',
    number: '1000',
    complement: 'Apto 42',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    shippingMethod: 'standard',
    shippingCost: 0,
    paymentMethod: 'pix',
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'CARLOS MENDES',
    cardExpiry: '12/28',
    cardCvv: '•••',
    cardInstallments: 1,
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingCost = formData.shippingMethod === 'express' ? 24.9 : (subtotal >= 199 ? 0 : 15.9);
  const total = subtotal + shippingCost;

  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setOrderId('');
      trackAnalyticsEvent('checkout_etapa_visualizada', {
        etapa_numero: 1,
        etapa_nome: 'Identificação',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    const next = currentStep + 1;
    setCurrentStep(next);
    const stepNames = ['', 'Identificação', 'Endereço', 'Entrega', 'Pagamento', 'Revisão'];
    trackAnalyticsEvent('checkout_etapa_visualizada', {
      etapa_numero: next,
      etapa_nome: stepNames[next] || 'Etapa',
    });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinishSimulatedOrder = () => {
    const generatedId = `MGLS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    trackAnalyticsEvent('pedido_concluido_simulado', {
      pedido_id: generatedId,
      valor_total: total,
      metodo_pagamento: formData.paymentMethod,
      total_itens: cartItems.length,
    });
    onOrderCompleted();
  };

  const steps = [
    { num: 1, label: 'Identificação', icon: User },
    { num: 2, label: 'Endereço', icon: MapPin },
    { num: 3, label: 'Entrega', icon: Truck },
    { num: 4, label: 'Pagamento', icon: CreditCard },
    { num: 5, label: 'Revisão', icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div
        className="relative w-full max-w-4xl bg-[#11131a] border border-[#262c3b] rounded-2xl shadow-2xl overflow-hidden z-10 text-white my-6 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#212635] flex items-center justify-between bg-[#151822]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base sm:text-lg text-white">
                  Checkout Demonstrativo V1
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  Simulação
                </span>
              </div>
              <p className="text-xs text-gray-400">
                MGLS Imports — Ambiente acadêmico SENAI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#202533] transition-colors border border-transparent hover:border-[#2f364a]"
            title="Fechar"
            id="close-checkout-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Caution Banner as requested */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-xs text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            <strong>Aviso de Protótipo:</strong> Este é um fluxo de demonstração para a V1 da MGLS Imports. Nenhum dado financeiro ou cartão real é processado ou armazenado.
          </span>
        </div>

        {/* Order Confirmed Screen */}
        {orderId ? (
          <div className="p-8 sm:p-12 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Pedido Simulado com Sucesso!
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Obrigado pelo seu pedido, Carlos!
              </h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                Seu pedido foi registrado no protótipo da MGLS Imports. Todos os eventos de conversão foram preparados para o Google Analytics da atividade SENAI.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#161a24] border border-[#252c3c] max-w-md mx-auto text-left space-y-2.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#252b3a]">
                <span className="text-gray-400">Número do Pedido:</span>
                <span className="font-mono font-bold text-amber-400">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Pago (Simulado):</span>
                <span className="font-bold text-white">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Forma Escolhida:</span>
                <span className="text-gray-200 capitalize">
                  {formData.paymentMethod === 'pix'
                    ? 'PIX Instantâneo'
                    : formData.paymentMethod === 'credit-card'
                    ? 'Cartão de Crédito'
                    : 'Boleto Bancário'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Previsão de Entrega:</span>
                <span className="text-emerald-400 font-medium">3 a 5 dias úteis (simulado)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all transform active:scale-95 shadow-lg shadow-amber-400/20"
                id="finish-order-close-btn"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
            {/* Left Steps Content */}
            <div className="flex-1 p-6 sm:p-8 space-y-6">
              {/* Stepper Navigation */}
              <div className="grid grid-cols-5 gap-1 pb-4 border-b border-[#212635]">
                {steps.map((s) => {
                  const Icon = s.icon;
                  const isActive = currentStep === s.num;
                  const isDone = currentStep > s.num;

                  return (
                    <div
                      key={s.num}
                      className={`flex flex-col items-center text-center p-1 rounded-lg transition-colors ${
                        isActive
                          ? 'text-amber-400'
                          : isDone
                          ? 'text-emerald-400'
                          : 'text-gray-500'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 border ${
                          isActive
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                            : isDone
                            ? 'bg-emerald-400/20 border-emerald-400 text-emerald-400'
                            : 'bg-[#181c26] border-[#293042] text-gray-500'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[10px] font-medium hidden sm:block">
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Step 1: Identificação */}
              {currentStep === 1 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-[#212635] pb-2">
                    <h3 className="font-display font-semibold text-base text-white">
                      1. Identificação do Cliente
                    </h3>
                    <p className="text-xs text-gray-400">
                      Informe os dados para emissão simulada e rastreamento do pedido.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        E-mail de Contato
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Celular / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Endereço */}
              {currentStep === 2 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-[#212635] pb-2">
                    <h3 className="font-display font-semibold text-base text-white">
                      2. Endereço de Entrega
                    </h3>
                    <p className="text-xs text-gray-400">
                      Simulação de entrega para todo o território nacional.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Rua / Avenida
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={formData.complement}
                        onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Estado (UF)
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-[#171a23] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Entrega */}
              {currentStep === 3 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-[#212635] pb-2">
                    <h3 className="font-display font-semibold text-base text-white">
                      3. Modalidade de Envio
                    </h3>
                    <p className="text-xs text-gray-400">
                      Escolha a opção logística simulada para sua região.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label
                      onClick={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.shippingMethod === 'standard'
                          ? 'bg-amber-400/10 border-amber-400 text-white'
                          : 'bg-[#171a23] border-[#293142] text-gray-300 hover:border-[#38435a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            formData.shippingMethod === 'standard'
                              ? 'border-amber-400'
                              : 'border-gray-500'
                          }`}
                        >
                          {formData.shippingMethod === 'standard' && (
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">Entrega Padrão MGLS</span>
                            {subtotal >= 199 && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                                FRETE GRÁTIS
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400">Prazo estimado: 5 a 8 dias úteis</span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-white">
                        {subtotal >= 199 ? 'Grátis' : 'R$ 15,90'}
                      </span>
                    </label>

                    <label
                      onClick={() => setFormData({ ...formData, shippingMethod: 'express' })}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.shippingMethod === 'express'
                          ? 'bg-amber-400/10 border-amber-400 text-white'
                          : 'bg-[#171a23] border-[#293142] text-gray-300 hover:border-[#38435a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            formData.shippingMethod === 'express'
                              ? 'border-amber-400'
                              : 'border-gray-500'
                          }`}
                        >
                          {formData.shippingMethod === 'express' && (
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-sm">Entrega Expressa Prioritária</span>
                          <span className="text-xs text-gray-400 block">Prazo estimado: 2 a 4 dias úteis</span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-white">R$ 24,90</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 4: Pagamento */}
              {currentStep === 4 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-[#212635] pb-2">
                    <h3 className="font-display font-semibold text-base text-white">
                      4. Forma de Pagamento (Demonstração)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Selecione um método simulado para testar o fechamento de pedido.
                    </p>
                  </div>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pix', label: 'PIX Instantâneo', badge: '5% OFF' },
                      { id: 'credit-card', label: 'Cartão de Crédito', badge: 'Até 3x' },
                      { id: 'boleto', label: 'Boleto Bancário', badge: 'Venc. 3 dias' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: p.id as any })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.paymentMethod === p.id
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-[#171a23] border-[#272f40] text-gray-400 hover:border-[#39445c]'
                        }`}
                      >
                        <span className="block font-semibold text-xs text-white">{p.label}</span>
                        <span className="text-[10px] text-amber-400">{p.badge}</span>
                      </button>
                    ))}
                  </div>

                  {/* Method Content */}
                  {formData.paymentMethod === 'pix' && (
                    <div className="p-4 rounded-xl bg-[#171a23] border border-[#272f40] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-lg text-black shrink-0">
                          <QrCode className="w-12 h-12" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Aprovação imediata no protótipo
                          </span>
                          <p className="text-xs text-gray-300 leading-snug">
                            QR Code gerado para fins visuais. Ao clicar em concluir, a compra será confirmada automaticamente.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          readOnly
                          value="00020126580014br.gov.bcb.pix0136mgls-imports-prototype-senai-ecommerce-v1"
                          className="w-full bg-[#101219] border border-[#272d3e] rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCopiedPix(true);
                            setTimeout(() => setCopiedPix(false), 2000);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#242a3a] hover:bg-[#2e364a] text-xs font-semibold text-gray-200 flex items-center gap-1 shrink-0"
                        >
                          {copiedPix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'credit-card' && (
                    <div className="p-4 rounded-xl bg-[#171a23] border border-[#272f40] space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Número do Cartão (Simulado)
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            readOnly
                            className="w-full bg-[#11131a] border border-[#2b3345] rounded-xl px-3 py-2 text-xs text-gray-300 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Nome no Cartão
                          </label>
                          <input
                            type="text"
                            value={formData.cardName}
                            readOnly
                            className="w-full bg-[#11131a] border border-[#2b3345] rounded-xl px-3 py-2 text-xs text-gray-300 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Parcelas
                          </label>
                          <select className="w-full bg-[#11131a] border border-[#2b3345] rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none">
                            <option>1x de {formatPrice(total)} sem juros</option>
                            <option>2x de {formatPrice(total / 2)} sem juros</option>
                            <option>3x de {formatPrice(total / 3)} sem juros</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'boleto' && (
                    <div className="p-4 rounded-xl bg-[#171a23] border border-[#272f40] space-y-2">
                      <p className="text-xs text-gray-300">
                        O boleto bancário simulado terá vencimento em 3 dias úteis. A simulação aprova o pedido assim que finalizado.
                      </p>
                      <span className="text-[11px] text-amber-400 font-mono block">
                        Linha digitável: 34191.79001 01043.510047 91020.150008 5 9123000000000
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Revisão do Pedido */}
              {currentStep === 5 && (
                <div className="space-y-4 text-left">
                  <div className="border-b border-[#212635] pb-2">
                    <h3 className="font-display font-semibold text-base text-white">
                      5. Revisão Final do Pedido
                    </h3>
                    <p className="text-xs text-gray-400">
                      Confirme os itens e as informações antes de finalizar o protótipo.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#171a23] border border-[#262c3b] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cliente:</span>
                        <span className="font-semibold text-white">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Entrega:</span>
                        <span className="text-gray-200">
                          {formData.address}, {formData.number} - {formData.city}/{formData.state}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Método de Pagamento:</span>
                        <span className="text-amber-400 uppercase font-semibold">
                          {formData.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#141720] text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-9 h-9 rounded object-cover"
                            />
                            <div>
                              <span className="font-medium text-white block line-clamp-1">
                                {item.product.name}
                              </span>
                              <span className="text-gray-400 text-[11px]">
                                Qtd: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-white">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-4 border-t border-[#212635] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2.5 rounded-xl bg-[#1c202d] hover:bg-[#252b3c] text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-1.5 transition-all transform active:scale-95 shadow-md shadow-amber-400/20"
                    id="checkout-next-step-btn"
                  >
                    <span>Avançar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishSimulatedOrder}
                    className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs flex items-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-emerald-400/20"
                    id="checkout-confirm-btn"
                  >
                    <Check className="w-4 h-4" />
                    <span>Concluir Pedido Demonstrativo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <div className="w-full md:w-72 bg-[#141722] border-t md:border-t-0 md:border-l border-[#222736] p-6 space-y-4 text-left">
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                Resumo da Compra
              </h4>

              <div className="space-y-2 text-xs text-gray-300 border-b border-[#23293a] pb-4">
                <div className="flex justify-between">
                  <span>Itens ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="text-emerald-400 font-semibold">
                    {shippingCost === 0 ? 'Grátis' : formatPrice(shippingCost)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs font-bold text-white">Total</span>
                <span className="font-display font-extrabold text-xl text-amber-400">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#191d29] border border-[#272f42] space-y-2 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  Certificado SSL Demonstrativo
                </span>
                <p className="leading-snug">
                  Dados preenchidos são meramente acadêmicos para simular a experiência de compra da V1 MGLS Imports.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
