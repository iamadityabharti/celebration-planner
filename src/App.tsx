import React, { useState, useEffect } from 'react';
import { Palette, DollarSign, Clock, Store, Users, Sparkles, Heart } from 'lucide-react';
import { EventPlan, BudgetPlan, MilestoneItem, RunOfShowItem, VendorItem, GuestItem, InvitationTemplates } from './types';
import { DEFAULT_PRESETS } from './data/defaultPresets';
import { Navbar } from './components/Navbar';
import { EventHeader } from './components/EventHeader';
import { IdeaDeck } from './components/IdeaDeck';
import { BudgetTracker } from './components/BudgetTracker';
import { TimelineView } from './components/TimelineView';
import { VendorChecklist } from './components/VendorChecklist';
import { GuestManager } from './components/GuestManager';
import { CopilotChat } from './components/CopilotChat';
import { EventWizardModal } from './components/EventWizardModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { exportEventPlanToPDF } from './services/pdfExport';
import { generateCelebrationPlan, GenerateEventParams } from './services/aiService';

export const App: React.FC = () => {
  const [currentPresetKey, setCurrentPresetKey] = useState<string>('wedding');
  const [eventPlan, setEventPlan] = useState<EventPlan>(() => {
    const saved = localStorage.getItem('celebrai_current_plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved plan', e);
      }
    }
    return DEFAULT_PRESETS.wedding;
  });

  const [activeTab, setActiveTab] = useState<'theme' | 'budget' | 'timeline' | 'vendors' | 'guests'>('theme');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('celebrai_gemini_key') || '');

  // Persist current event plan to localStorage
  useEffect(() => {
    localStorage.setItem('celebrai_current_plan', JSON.stringify(eventPlan));
  }, [eventPlan]);

  // Persist API key
  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('celebrai_gemini_key', newKey);
  };

  const handleSelectPreset = (key: string) => {
    if (DEFAULT_PRESETS[key]) {
      setCurrentPresetKey(key);
      setEventPlan(DEFAULT_PRESETS[key]);
    }
  };

  const handleGenerateNewPlan = async (params: GenerateEventParams) => {
    const newPlan = await generateCelebrationPlan(params);
    setCurrentPresetKey('custom');
    setEventPlan(newPlan);
    setActiveTab('theme');
  };

  const handleExportPDF = () => {
    exportEventPlanToPDF(eventPlan);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-fuchsia-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentPresetKey={currentPresetKey}
        onSelectPreset={handleSelectPreset}
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyOpen(true)}
        onExportPDF={handleExportPDF}
        onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
        hasApiKey={Boolean(apiKey && apiKey.length > 5)}
        isCopilotOpen={isCopilotOpen}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {/* Event Header with Countdown, Confetti, and Specs */}
        <EventHeader plan={eventPlan} />

        {/* Feature Tabs Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'theme'
                ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Palette className="w-4 h-4 text-fuchsia-300" />
            <span>Theme & Ideas</span>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'budget'
                ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Budget & Expenses</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Timeline & Run of Show</span>
          </button>

          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'vendors'
                ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Store className="w-4 h-4 text-cyan-400" />
            <span>Vendor Checklists</span>
            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full text-slate-300">
              {eventPlan.vendors.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('guests')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'guests'
                ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Guests & Invitations</span>
          </button>
        </div>

        {/* Tab Views */}
        <div className="pb-16">
          {activeTab === 'theme' && <IdeaDeck theme={eventPlan.theme} />}
          {activeTab === 'budget' && (
            <BudgetTracker
              budget={eventPlan.budget}
              onUpdateBudget={(updated: BudgetPlan) => setEventPlan({ ...eventPlan, budget: updated })}
            />
          )}
          {activeTab === 'timeline' && (
            <TimelineView
              milestones={eventPlan.milestones}
              runOfShow={eventPlan.runOfShow}
              onUpdateMilestones={(m: MilestoneItem[]) => setEventPlan({ ...eventPlan, milestones: m })}
              onUpdateRunOfShow={(r: RunOfShowItem[]) => setEventPlan({ ...eventPlan, runOfShow: r })}
            />
          )}
          {activeTab === 'vendors' && (
            <VendorChecklist
              vendors={eventPlan.vendors}
              currencySymbol={eventPlan.budget.currencySymbol}
              onUpdateVendors={(v: VendorItem[]) => setEventPlan({ ...eventPlan, vendors: v })}
            />
          )}
          {activeTab === 'guests' && (
            <GuestManager
              guests={eventPlan.guests}
              invitations={eventPlan.invitations}
              onUpdateGuests={(g: GuestItem[]) => setEventPlan({ ...eventPlan, guests: g })}
              onUpdateInvitations={(inv: InvitationTemplates) => setEventPlan({ ...eventPlan, invitations: inv })}
            />
          )}
        </div>

      </main>

      {/* Floating Copilot Trigger Button (Mobile / Quick access) */}
      {!isCopilotOpen && (
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 hover:from-fuchsia-500 hover:to-amber-400 text-white font-bold text-sm shadow-2xl shadow-fuchsia-600/40 transition transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Ask Copilot</span>
        </button>
      )}

      {/* AI Copilot Side Drawer */}
      <CopilotChat
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        eventPlan={eventPlan}
        apiKey={apiKey}
      />

      {/* Event Generator Wizard Modal */}
      <EventWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onGenerate={handleGenerateNewPlan}
        apiKey={apiKey}
      />

      {/* Google Gemini API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">Celebrai AI</span>
            <span>•</span>
            <span>GenAI Event & Celebration Planner</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Engineered with Gemini GenAI & React</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for seamless celebrations</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
