import React from 'react';
import confetti from 'canvas-confetti';
import { Calendar, MapPin, Users, DollarSign, Sparkles, PartyPopper } from 'lucide-react';
import { EventPlan } from '../types';

interface EventHeaderProps {
  plan: EventPlan;
}

export const EventHeader: React.FC<EventHeaderProps> = ({ plan }) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: plan.theme.palette.map(p => p.hex)
    });
  };

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    try {
      const target = new Date(plan.date);
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays > 0) return `${diffDays} Days to Go`;
      if (diffDays === 0) return 'Happening Today!';
      return 'Completed Event';
    } catch {
      return 'Upcoming';
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'wedding':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'birthday':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'community':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
      {/* Background ambient decorative glow */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${plan.theme.palette[0]?.hex || '#d946ef'}, transparent 70%)`
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${plan.theme.palette[1]?.hex || '#ec4899'}, transparent 70%)`
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border ${getBadgeStyle(plan.eventType)}`}>
              {plan.eventType}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              {calculateDaysRemaining()}
            </span>
            <span className="text-xs font-medium text-slate-400 italic">
              "{plan.theme.tagline}"
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-display">
            {plan.title}
          </h1>

          {/* Vibe / Atmosphere description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {plan.theme.description}
          </p>

          {/* Meta specs bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
              <Calendar className="w-4 h-4 text-fuchsia-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Event Date</div>
                <div className="font-medium text-slate-200">{plan.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
              <div className="truncate">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Location</div>
                <div className="font-medium text-slate-200 truncate" title={plan.location}>
                  {plan.location}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Guests</div>
                <div className="font-medium text-slate-200">{plan.guestCount} Attending</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
              <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Budget</div>
                <div className="font-medium text-emerald-400">
                  {plan.budget.currencySymbol}{plan.budget.totalBudget.toLocaleString()} {plan.budget.currency}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Confetti Blast */}
        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0">
          <button
            onClick={triggerConfetti}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 hover:from-fuchsia-500 hover:to-amber-400 text-white font-semibold text-sm shadow-xl shadow-fuchsia-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PartyPopper className="w-4 h-4 animate-bounce" />
            <span>Celebrate!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

