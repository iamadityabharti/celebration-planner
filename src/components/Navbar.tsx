import React from 'react';
import { Sparkles, PlusCircle, Download, Key, Bot, PartyPopper } from 'lucide-react';
import { DEFAULT_PRESETS } from '../data/defaultPresets';

interface NavbarProps {
  currentPresetKey: string;
  onSelectPreset: (key: string) => void;
  onOpenWizard: () => void;
  onOpenApiKeyModal: () => void;
  onExportPDF: () => void;
  onToggleCopilot: () => void;
  hasApiKey: boolean;
  isCopilotOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPresetKey,
  onSelectPreset,
  onOpenWizard,
  onOpenApiKeyModal,
  onExportPDF,
  onToggleCopilot,
  hasApiKey,
  isCopilotOpen
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-amber-400 p-[1.5px] shadow-lg shadow-fuchsia-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <PartyPopper className="w-5 h-5 text-fuchsia-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                Celebrai
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                GenAI 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">AI Celebration & Event Architect</p>
          </div>
        </div>

        {/* Preset Switcher & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Demo Switcher */}
          <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-medium">Demo:</span>
            <button
              onClick={() => onSelectPreset('wedding')}
              className={`px-2.5 py-1.5 rounded-lg transition font-medium ${
                currentPresetKey === 'wedding'
                  ? 'bg-fuchsia-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              💍 Wedding
            </button>
            <button
              onClick={() => onSelectPreset('birthday')}
              className={`px-2.5 py-1.5 rounded-lg transition font-medium ${
                currentPresetKey === 'birthday'
                  ? 'bg-fuchsia-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🎂 30th Birthday
            </button>
            <button
              onClick={() => onSelectPreset('community')}
              className={`px-2.5 py-1.5 rounded-lg transition font-medium ${
                currentPresetKey === 'community'
                  ? 'bg-fuchsia-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🌳 Eco-Fest
            </button>
          </div>

          {/* New Event AI Wizard button */}
          <button
            onClick={onOpenWizard}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white shadow-lg shadow-fuchsia-600/25 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Generate Event</span>
            <span className="sm:hidden">New</span>
          </button>

          {/* Export PDF */}
          <button
            onClick={onExportPDF}
            title="Download Plan PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-200 hover:text-white transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden lg:inline">Export PDF</span>
          </button>

          {/* Gemini API Key */}
          <button
            onClick={onOpenApiKeyModal}
            title="Configure Gemini API Key"
            className={`p-2 rounded-xl border text-xs transition flex items-center gap-1.5 ${
              hasApiKey
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Key className="w-4 h-4" />
            <span className="hidden xl:inline">{hasApiKey ? 'Gemini Active' : 'API Key'}</span>
          </button>

          {/* Copilot Drawer Toggle */}
          <button
            onClick={onToggleCopilot}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-xl transition border active:scale-95 ${
              isCopilotOpen
                ? 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-fuchsia-400" />
            <span className="hidden sm:inline">Copilot</span>
          </button>
        </div>

      </div>
    </header>
  );
};

