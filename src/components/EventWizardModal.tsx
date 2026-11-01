import React, { useState } from 'react';
import { Sparkles, X, Wand2, RefreshCw } from 'lucide-react';
import { EventType, CurrencyCode } from '../types';
import { GenerateEventParams } from '../services/aiService';

interface EventWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (params: GenerateEventParams) => Promise<void>;
  apiKey: string;
}

export const EventWizardModal: React.FC<EventWizardModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  apiKey
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GenerateEventParams>({
    title: '',
    eventType: 'birthday',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: '',
    guestCount: 50,
    totalBudget: 5000,
    currency: 'USD',
    vibe: 'Modern, Energetic, Warm Candlelight, Joyful',
    specialNotes: '',
    apiKey
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    setLoading(true);
    try {
      await onGenerate({ ...formData, apiKey });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const vibePresets: Record<EventType, string[]> = {
    wedding: ['Romantic Sunset & Champagne', 'Earthy Rustic Vineyard', 'Modern Minimalist Luxury', 'Grand Royal Traditional'],
    birthday: ['80s Neon Synthwave Arcade', 'Speakeasy Velvet Jazz', 'Tropical Sunset Rooftop', 'Golden Glamour Milestone'],
    community: ['Zero-Waste Eco Harvest', 'Artisan Street Market & Folk', 'Neighborhood Summer Block Party', 'Charity Run & Festival'],
    anniversary: ['Candlelit Silver & Tuscan Wine', 'Private Yacht Starlight Dinner', 'Vow Renewal Garden Soirée'],
    festival: ['Psychedelic Bohemian Arts', 'Harvest Pumpkin & Cider Fest', 'Solar-Powered Acoustic Fair'],
    corporate: ['Futuristic Tech Showcase Gala', 'Executive Rooftop Mixer', 'Creative Innovation Retreat']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center shadow-lg shadow-fuchsia-600/30">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                GenAI Celebration Architect
              </h2>
              <p className="text-xs text-slate-400">
                Design custom themes, budgets, run of show & checklists in seconds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-5">
          
          {/* Event Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Celebration / Event Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maya & Leo's Vineyard Wedding, David's 40th Jazz Gala"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {/* Event Type & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Event Category
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => {
                  const newType = e.target.value as EventType;
                  setFormData({
                    ...formData,
                    eventType: newType,
                    vibe: vibePresets[newType]?.[0] || formData.vibe
                  });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500"
              >
                <option value="wedding">💍 Wedding</option>
                <option value="birthday">🎂 Birthday Bash</option>
                <option value="community">🌳 Community Event / Fest</option>
                <option value="anniversary">🥂 Anniversary</option>
                <option value="festival">🎪 Festival / Cultural Fair</option>
                <option value="corporate">💼 Corporate Gala / Milestone</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
          </div>

          {/* Location & Guest count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                City / Venue / Setting
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Austin Botanical Garden, Brooklyn Loft, Home Backyard"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Expected Guests ({formData.guestCount})
              </label>
              <input
                type="number"
                min="5"
                max="5000"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 20 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>
          </div>

          {/* Budget & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Total Target Budget
              </label>
              <input
                type="number"
                min="100"
                step="100"
                required
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: parseFloat(e.target.value) || 1000 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value as CurrencyCode })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="AUD">AUD (AU$)</option>
              </select>
            </div>
          </div>

          {/* Vibe / Atmosphere */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Aesthetic Vibe & Atmosphere
              </label>
              <span className="text-[11px] text-fuchsia-400">Select preset or type custom</span>
            </div>
            <input
              type="text"
              required
              value={formData.vibe}
              onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500 mb-2"
            />
            {/* Quick vibe pills */}
            <div className="flex flex-wrap gap-1.5">
              {(vibePresets[formData.eventType] || []).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFormData({ ...formData, vibe: preset })}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Special notes */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Special Wishes or Preferences (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Must include acoustic live music, vegetarian tapas bar, outdoor fire pits, dog-friendly"
              value={formData.specialNotes}
              onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 hover:from-fuchsia-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-fuchsia-600/30 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Masterplan</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
