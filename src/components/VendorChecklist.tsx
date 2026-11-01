import React, { useState } from 'react';
import { Store, CheckSquare, Square, MessageSquare, Phone, Plus, Trash2, HelpCircle } from 'lucide-react';
import { VendorItem } from '../types';

interface VendorChecklistProps {
  vendors: VendorItem[];
  currencySymbol: string;
  onUpdateVendors: (updated: VendorItem[]) => void;
}

export const VendorChecklist: React.FC<VendorChecklistProps> = ({
  vendors,
  currencySymbol,
  onUpdateVendors
}) => {
  const [selectedVendorForRfp, setSelectedVendorForRfp] = useState<VendorItem | null>(null);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [newVendor, setNewVendor] = useState({
    category: 'Catering' as any,
    name: '',
    contact: '',
    cost: '',
    notes: '',
    status: 'researching' as any
  });

  const statusOptions = ['researching', 'contacted', 'quoted', 'booked', 'paid'] as const;

  const updateStatus = (id: string, status: any) => {
    onUpdateVendors(
      vendors.map(v => (v.id === id ? { ...v, status } : v))
    );
  };

  const toggleChecklistItem = (vendorId: string, itemIdx: number) => {
    onUpdateVendors(
      vendors.map(v => {
        if (v.id !== vendorId) return v;
        const newChecklist = [...v.checklist];
        newChecklist[itemIdx] = { ...newChecklist[itemIdx], done: !newChecklist[itemIdx].done };
        return { ...v, checklist: newChecklist };
      })
    );
  };

  const deleteVendor = (id: string) => {
    onUpdateVendors(vendors.filter(v => v.id !== id));
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name) return;

    const vendor: VendorItem = {
      id: 'v-' + Date.now(),
      category: newVendor.category,
      name: newVendor.name,
      contact: newVendor.contact,
      status: newVendor.status,
      cost: parseFloat(newVendor.cost) || 0,
      notes: newVendor.notes,
      checklist: [
        { item: 'Initial inquiry sent', done: true },
        { item: 'Contract & pricing reviewed', done: false },
        { item: 'Deposit payment processed', done: false }
      ],
      rfpQuestions: [
        `What is your availability and cancellation/reschedule policy?`,
        `What is included in the base package versus extra surcharges?`,
        `Can you provide 2 references from similar recent events?`
      ]
    };

    onUpdateVendors([...vendors, vendor]);
    setNewVendor({
      category: 'Catering',
      name: '',
      contact: '',
      cost: '',
      notes: '',
      status: 'researching'
    });
    setShowAddVendor(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
      case 'booked':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'quoted':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'contacted':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white">Vendor Checklists & Partnership Hub</h3>
          <p className="text-xs text-slate-400">Track contracts, milestone deliverables, quotes, and AI interview questions</p>
        </div>
        <button
          onClick={() => setShowAddVendor(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Vendor</span>
        </button>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
            
            {/* Top row */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60 inline-block mb-1.5">
                    {vendor.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-100">{vendor.name}</h4>
                </div>

                {/* Status Dropdown */}
                <select
                  value={vendor.status}
                  onChange={(e) => updateStatus(vendor.id, e.target.value)}
                  className={`text-[11px] font-bold uppercase rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${getStatusBadge(vendor.status)}`}
                >
                  {statusOptions.map(st => (
                    <option key={st} value={st} className="bg-slate-900 text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact info & cost */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 my-2">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-pink-400" />
                  <span className="truncate max-w-[200px]">{vendor.contact}</span>
                </span>
                <span className="font-semibold text-emerald-400 font-mono">
                  {currencySymbol}{vendor.cost.toLocaleString()}
                </span>
              </div>

              {vendor.notes && (
                <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 mb-3.5">
                  <span className="text-slate-500 font-semibold mr-1">Notes:</span>
                  {vendor.notes}
                </p>
              )}

              {/* Specific Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Action Deliverables
                </span>
                {vendor.checklist.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklistItem(vendor.id, idx)}
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition w-full text-left py-0.5"
                  >
                    {item.done ? (
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    )}
                    <span className={item.done ? 'line-through text-slate-500' : ''}>{item.item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom bar: AI RFP questions button & Delete */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedVendorForRfp(vendor)}
                className="flex items-center gap-1.5 text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>AI Interview Questions ({vendor.rfpQuestions?.length || 3})</span>
              </button>

              <button
                onClick={() => deleteVendor(vendor.id)}
                className="text-slate-500 hover:text-rose-400 p-1 transition"
                title="Remove Vendor"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* AI RFP / Interview Questions Modal */}
      {selectedVendorForRfp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-fuchsia-400">
                  AI Vendor Interviewer
                </span>
                <h3 className="text-base font-bold text-white">
                  Questions to ask {selectedVendorForRfp.name} ({selectedVendorForRfp.category})
                </h3>
              </div>
              <button
                onClick={() => setSelectedVendorForRfp(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              Protect your budget, avoid hidden fees, and lock in quality by asking these vetted questions before signing:
            </p>

            <div className="space-y-3 mb-6">
              {selectedVendorForRfp.rfpQuestions.map((q, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 font-bold flex items-center justify-center shrink-0 border border-fuchsia-500/20 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{q}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedVendorForRfp(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition"
              >
                Done Reviewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add Event Vendor Partner</h3>
            <form onSubmit={handleAddVendor} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newVendor.category}
                    onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  >
                    <option value="Venue">Venue</option>
                    <option value="Catering">Catering</option>
                    <option value="Photography">Photography</option>
                    <option value="Decor & Floral">Decor & Floral</option>
                    <option value="Music & DJ">Music & DJ</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Attire">Attire</option>
                    <option value="Permits & Safety">Permits & Safety</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={newVendor.status}
                    onChange={(e) => setNewVendor({ ...newVendor, status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  >
                    <option value="researching">Researching</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="booked">Booked</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vendor / Studio Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luminary Visuals Studio"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email / Phone</label>
                  <input
                    type="text"
                    placeholder="contact@studio.com"
                    value={newVendor.contact}
                    onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contract Cost ({currencySymbol})</label>
                  <input
                    type="number"
                    placeholder="2500"
                    value={newVendor.cost}
                    onChange={(e) => setNewVendor({ ...newVendor, cost: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Internal Notes & Terms</label>
                <input
                  type="text"
                  placeholder="e.g. Deposit paid on Sept 14th"
                  value={newVendor.notes}
                  onChange={(e) => setNewVendor({ ...newVendor, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddVendor(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
