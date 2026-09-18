import React, { useState, useEffect } from 'react';
import {
  subscribeToAnalytics,
  getAnalyticsHistory,
  clearAnalyticsHistory,
} from '../utils/analytics';
import { AnalyticsEventRecord } from '../types';
import { Activity, ChevronDown, ChevronUp, Trash2, CheckCircle, Code, Info } from 'lucide-react';

export const AnalyticsMonitor: React.FC = () => {
  const [events, setEvents] = useState<AnalyticsEventRecord[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AnalyticsEventRecord | null>(null);

  useEffect(() => {
    setEvents(getAnalyticsHistory());
    const unsubscribe = subscribeToAnalytics((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 30)]);
    });
    return () => unsubscribe();
  }, []);

  const handleClear = () => {
    clearAnalyticsHistory();
    setEvents([]);
    setSelectedEvent(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-full sm:w-96 text-left">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ml-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#171b26]/95 hover:bg-[#202533] text-white border border-[#2d364a] shadow-xl text-xs font-semibold transition-all backdrop-blur cursor-pointer hover:border-amber-400/50"
          id="toggle-analytics-monitor-btn"
          title="Abrir painel de eventos do Google Analytics para atividade SENAI"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Activity className="w-4 h-4 text-amber-400" />
          <span>Analytics SENAI</span>
          <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono text-[10px]">
            {events.length}
          </span>
        </button>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div className="bg-[#12151f] border border-[#2a3246] rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[26rem]">
          {/* Panel Header */}
          <div className="p-3 bg-[#171c2a] border-b border-[#242c3d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <div>
                <h4 className="font-display font-bold text-xs text-white">
                  Eventos Preparados (Google Analytics)
                </h4>
                <span className="text-[10px] text-gray-400 block">
                  Atividade acadêmica SENAI — Monitor em Tempo Real
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-1 rounded text-gray-400 hover:text-rose-400 transition-colors"
                title="Limpar histórico de eventos"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                title="Minimizar"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Instructions snippet */}
          <div className="bg-[#191e2e] px-3 py-2 border-b border-[#252e42] text-[11px] text-gray-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Google Analytics 4 ativo (<strong className="text-amber-300 font-mono">G-ZEH2MTTVJE</strong>). Os eventos customizados são enviados diretamente via <code>gtag(&apos;event&apos;, ...)</code>.
            </span>
          </div>

          {/* Events Stream */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 divide-y divide-[#1e2535]">
            {events.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">
                Nenhum evento registrado ainda. Navegue pelo site, pesquise ou adicione produtos ao carrinho para visualizar os disparos.
              </div>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() =>
                    setSelectedEvent(selectedEvent?.id === evt.id ? null : evt)
                  }
                  className="pt-1.5 cursor-pointer hover:bg-[#1a202e] p-1.5 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-amber-300 text-[11px]">
                      {evt.eventName}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {evt.timestamp}
                    </span>
                  </div>

                  {selectedEvent?.id === evt.id && (
                    <pre className="mt-1.5 p-2 rounded bg-[#0b0d13] border border-[#212738] text-[10px] text-gray-300 font-mono overflow-x-auto">
                      {JSON.stringify(evt.payload, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
