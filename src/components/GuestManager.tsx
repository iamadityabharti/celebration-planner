import React, { useState } from 'react';
import { Users, Mail, MessageSquare, Share2, Plus, Check, Copy, CheckCircle2, Clock, XCircle, Trash2 } from 'lucide-react';
import { GuestItem, InvitationTemplates } from '../types';

interface GuestManagerProps {
  guests: GuestItem[];
  invitations: InvitationTemplates;
  onUpdateGuests: (updated: GuestItem[]) => void;
  onUpdateInvitations: (updated: InvitationTemplates) => void;
}

export const GuestManager: React.FC<GuestManagerProps> = ({
  guests,
  invitations,
  onUpdateGuests,
  onUpdateInvitations
}) => {
  const [activeTab, setActiveTab] = useState<'guests' | 'invitations'>('guests');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    contact: '',
    status: 'pending' as any,
    dietary: 'None',
    plusOnes: 0,
    group: 'Friends'
  });

  const confirmedCount = guests.filter(g => g.status === 'confirmed').length;
  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const declinedCount = guests.filter(g => g.status === 'declined').length;
  const totalHeads = guests.reduce((sum, g) => (g.status === 'confirmed' ? sum + 1 + g.plusOnes : sum), 0);

  // Group dietary requirements
  const dietaryCounts = guests
    .filter(g => g.dietary && g.dietary.toLowerCase() !== 'none')
    .reduce((acc, g) => {
      acc[g.dietary] = (acc[g.dietary] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const updateStatus = (id: string, status: any) => {
    onUpdateGuests(
      guests.map(g => (g.id === id ? { ...g, status } : g))
    );
  };

  const deleteGuest = (id: string) => {
    onUpdateGuests(guests.filter(g => g.id !== id));
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name) return;

    const guest: GuestItem = {
      id: 'g-' + Date.now(),
      name: newGuest.name,
      contact: newGuest.contact,
      status: newGuest.status,
      dietary: newGuest.dietary || 'None',
      plusOnes: Number(newGuest.plusOnes) || 0,
      group: newGuest.group
    };

    onUpdateGuests([...guests, guest]);
    setNewGuest({
      name: '',
      contact: '',
      status: 'pending',
      dietary: 'None',
      plusOnes: 0,
      group: 'Friends'
    });
    setShowAddGuest(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('guests')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'guests'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Guest List & Dietary</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full">{guests.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('invitations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'invitations'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>AI Invitation Drafter</span>
          </button>
        </div>

        {activeTab === 'guests' && (
          <button
            onClick={() => setShowAddGuest(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-md transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Guest</span>
          </button>
        )}
      </div>

      {/* VIEW 1: Guest List */}
      {activeTab === 'guests' && (
        <div className="space-y-6">
          {/* Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Headcount</span>
              <div className="text-2xl font-black text-white mt-1">{totalHeads}</div>
              <span className="text-xs text-slate-400">Confirmed seats reserved</span>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Confirmed</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">{confirmedCount}</div>
              <span className="text-xs text-slate-400">Primary RSVPs</span>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Awaiting Reply</span>
              <div className="text-2xl font-black text-amber-400 mt-1">{pendingCount}</div>
              <span className="text-xs text-slate-400">Pending confirmation</span>
            </div>

            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Declined</span>
              <div className="text-2xl font-black text-slate-500 mt-1">{declinedCount}</div>
              <span className="text-xs text-slate-400">Cannot attend</span>
            </div>
          </div>

          {/* Dietary Summary Banner */}
          {Object.keys(dietaryCounts).length > 0 && (
            <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Special Dietary Requirements (For Caterer Hand-off)
              </span>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(dietaryCounts).map(([diet, count]) => (
                  <span
                    key={diet}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-pink-500/10 text-pink-300 border border-pink-500/20"
                  >
                    <span>{diet}:</span>
                    <span className="font-bold">{count} {count === 1 ? 'guest' : 'guests'}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Guest List Table */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 pl-2">Guest Name</th>
                    <th className="pb-3">Group</th>
                    <th className="pb-3">Dietary</th>
                    <th className="pb-3 text-center">+1s</th>
                    <th className="pb-3 text-center">RSVP Status</th>
                    <th className="pb-3 pr-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {guests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-slate-900/40 transition">
                      <td className="py-3 pl-2">
                        <div className="font-semibold text-slate-200">{guest.name}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{guest.contact}</div>
                      </td>
                      <td className="py-3 text-slate-300">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 border border-slate-700">
                          {guest.group}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs ${guest.dietary !== 'None' ? 'text-pink-400 font-semibold' : 'text-slate-500'}`}>
                          {guest.dietary}
                        </span>
                      </td>
                      <td className="py-3 text-center font-mono text-slate-300">
                        {guest.plusOnes > 0 ? `+${guest.plusOnes}` : '—'}
                      </td>
                      <td className="py-3 text-center">
                        <select
                          value={guest.status}
                          onChange={(e) => updateStatus(guest.id, e.target.value)}
                          className={`text-[11px] font-bold uppercase rounded-lg px-2.5 py-1 border cursor-pointer ${
                            guest.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : guest.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-slate-800 text-slate-500 border-slate-700'
                          }`}
                        >
                          <option value="confirmed" className="bg-slate-900 text-white">Confirmed</option>
                          <option value="pending" className="bg-slate-900 text-white">Pending</option>
                          <option value="declined" className="bg-slate-900 text-white">Declined</option>
                        </select>
                      </td>
                      <td className="py-3 pr-2 text-right">
                        <button
                          onClick={() => deleteGuest(guest.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                          title="Remove guest"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: AI Invitation Drafter */}
      {activeTab === 'invitations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* WhatsApp Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Instant WhatsApp / SMS Blast</h4>
                </div>
                <button
                  onClick={() => copyText(invitations.whatsapp, 'whatsapp')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold transition"
                >
                  {copiedType === 'whatsapp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'whatsapp' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {invitations.whatsapp}
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <h4 className="text-sm font-bold text-white">Formal Email Invitation</h4>
                </div>
                <button
                  onClick={() => copyText(`Subject: ${invitations.emailSubject}\n\n${invitations.emailBody}`, 'email')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 text-xs font-semibold transition"
                >
                  {copiedType === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'email' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono">
                  <span className="text-slate-500">Subject: </span>
                  {invitations.emailSubject}
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {invitations.emailBody}
                </div>
              </div>
            </div>
          </div>

          {/* Social Caption Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-fuchsia-400" />
                  <h4 className="text-sm font-bold text-white">Social Media Teaser / Instagram Caption</h4>
                </div>
                <button
                  onClick={() => copyText(invitations.socialCaption, 'social')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-600/20 border border-fuchsia-500/30 text-fuchsia-300 hover:bg-fuchsia-600/30 text-xs font-semibold transition"
                >
                  {copiedType === 'social' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'social' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                {invitations.socialCaption}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Add Guest Modal */}
      {showAddGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add Guest to Celebration</h3>
            <form onSubmit={handleAddGuest} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Guest Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email / Phone</label>
                <input
                  type="text"
                  placeholder="maya@example.com"
                  value={newGuest.contact}
                  onChange={(e) => setNewGuest({ ...newGuest, contact: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Group / Circle</label>
                  <input
                    type="text"
                    placeholder="e.g. VIP, Family, College"
                    value={newGuest.group}
                    onChange={(e) => setNewGuest({ ...newGuest, group: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Plus-Ones (+1)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={newGuest.plusOnes}
                    onChange={(e) => setNewGuest({ ...newGuest, plusOnes: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Dietary Restriction</label>
                  <input
                    type="text"
                    placeholder="e.g. Vegan, Gluten-Free, None"
                    value={newGuest.dietary}
                    onChange={(e) => setNewGuest({ ...newGuest, dietary: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">RSVP Status</label>
                  <select
                    value={newGuest.status}
                    onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddGuest(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
                >
                  Save Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

