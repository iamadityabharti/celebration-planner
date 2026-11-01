import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, User, CornerDownLeft, RefreshCw } from 'lucide-react';
import { EventPlan, ChatMessage } from '../types';
import { askCelebrationCopilot } from '../services/aiService';

interface CopilotChatProps {
  isOpen: boolean;
  onClose: () => void;
  eventPlan: EventPlan;
  apiKey: string;
}

export const CopilotChat: React.FC<CopilotChatProps> = ({
  isOpen,
  onClose,
  eventPlan,
  apiKey
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello! I'm your **Celebrai Copilot** for **"${eventPlan.title}"**.\n\nI have complete visibility into your budget (${eventPlan.budget.currencySymbol}${eventPlan.budget.totalBudget.toLocaleString()}), timeline, vendors, and ${eventPlan.guestCount} guests.\n\nAsk me anything — from emergency weather contingencies and speech drafting to vendor negotiations and budget trimming!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    `How can we cut 15% from the budget?`,
    `Plan for rainy weather contingency`,
    `Draft an emotional 2-minute toast speech`,
    `Give me interactive icebreaker games for guests`
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askCelebrationCopilot(
        textToSend,
        eventPlan,
        messages.map(m => ({ role: m.role, content: m.content })),
        apiKey
      );

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: 'ai-err-' + Date.now(),
        role: 'assistant',
        content: "I ran into a temporary hiccup generating that response. Please try again or refine your question!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-slate-950/95 border-l border-slate-800 shadow-2xl flex flex-col backdrop-blur-xl animate-slideLeft">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center shadow-md">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Celebration Copilot</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[240px]">
              Assisting: {eventPlan.title}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-fuchsia-600 text-white rounded-tr-none font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none font-sans'
              }`}
            >
              {m.content}
              <div className={`text-[10px] mt-1.5 font-mono ${m.role === 'user' ? 'text-fuchsia-200 text-right' : 'text-slate-400'}`}>
                {m.timestamp}
              </div>
            </div>

            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-fuchsia-400 p-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Copilot is formulating creative ideas...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/30">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-fuchsia-400" />
          <span>Suggested Inquiries</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-fuchsia-500/40 px-2.5 py-1 rounded-lg transition text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot anything about this event..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-white transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
