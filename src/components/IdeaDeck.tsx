import React, { useState } from 'react';
import { Palette, Utensils, Sparkles, Camera, Check, Copy, Hash, Lightbulb, Music } from 'lucide-react';
import { ThemeDetails } from '../types';

interface IdeaDeckProps {
  theme: ThemeDetails;
}

export const IdeaDeck: React.FC<IdeaDeckProps> = ({ theme }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const copyToClipboard = (text: string, isHex = false) => {
    navigator.clipboard.writeText(text);
    if (isHex) {
      setCopiedHex(text);
      setTimeout(() => setCopiedHex(null), 2000);
    } else {
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Curated Color Palette */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-fuchsia-400" />
            <h3 className="text-base font-bold text-white">AI Curated Color Palette</h3>
          </div>
          <span className="text-xs text-slate-400">Click any swatch to copy HEX code</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {theme.palette.map((color, idx) => (
            <button
              key={idx}
              onClick={() => copyToClipboard(color.hex, true)}
              className="group relative flex flex-col p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 transition text-left"
            >
              <div
                className="w-full h-14 rounded-lg shadow-inner mb-2.5 transition group-hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs font-semibold text-slate-200 truncate">{color.name}</span>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>{color.hex}</span>
                {copiedHex === color.hex ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Decor Styling & Atmosphere Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Signature Decor Styling Concepts</h3>
          </div>
          <ul className="space-y-3">
            {theme.decorIdeas.map((idea, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/20">
                  {idx + 1}
                </span>
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Signature Food & Drink Menu */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-bold text-white">Signature Food & Drink Pairings</h3>
          </div>
          <div className="space-y-3">
            {theme.signatureFoodDrinks.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-sm shrink-0 border border-pink-500/20">
                  {item.type === 'drink' ? '🍸' : item.type === 'dessert' ? '🍰' : '🍽️'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-100">{item.name}</h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Entertainment & Photo-Op Installations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">Interactive Entertainment Highlights</h3>
          </div>
          <div className="space-y-2.5">
            {theme.entertainmentConcepts.map((concept, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs sm:text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Memorable Photo-Op Installations</h3>
          </div>
          <div className="space-y-2.5">
            {theme.photoOpIdeas.map((photoOp, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs sm:text-sm text-slate-300">
                <Camera className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{photoOp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Custom Social Hashtags */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-fuchsia-400" />
          <span className="text-sm font-semibold text-slate-200">Event Hashtags:</span>
          <div className="flex flex-wrap gap-2">
            {theme.hashtags.map((tag, idx) => (
              <span key={idx} className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(theme.hashtags.join(' '))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition shrink-0"
        >
          {copiedHashtags ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copiedHashtags ? 'Copied' : 'Copy All'}</span>
        </button>
      </div>

    </div>
  );
};

