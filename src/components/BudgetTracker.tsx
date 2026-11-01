import React, { useState } from 'react';
import { DollarSign, Plus, CheckCircle, Clock, AlertTriangle, TrendingDown, Trash2 } from 'lucide-react';
import { BudgetPlan, BudgetItem } from '../types';

interface BudgetTrackerProps {
  budget: BudgetPlan;
  onUpdateBudget: (updated: BudgetPlan) => void;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ budget, onUpdateBudget }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Venue & Rentals',
    estimatedCost: '',
    actualCost: '',
    paid: false,
    notes: ''
  });

  // Calculate totals
  const totalEstimated = budget.items.reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalActual = budget.items.reduce((sum, item) => sum + item.actualCost, 0);
  const totalPaid = budget.items.filter(i => i.paid).reduce((sum, item) => sum + item.actualCost, 0);
  const remaining = budget.totalBudget - totalActual;
  const percentUsed = Math.min(Math.round((totalActual / budget.totalBudget) * 100), 100);

  const togglePaid = (id: string) => {
    const updatedItems = budget.items.map(item =>
      item.id === id ? { ...item, paid: !item.paid } : item
    );
    onUpdateBudget({ ...budget, items: updatedItems });
  };

  const deleteItem = (id: string) => {
    const updatedItems = budget.items.filter(item => item.id !== id);
    onUpdateBudget({ ...budget, items: updatedItems });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.estimatedCost) return;

    const est = parseFloat(newItem.estimatedCost) || 0;
    const act = parseFloat(newItem.actualCost) || est;

    const item: BudgetItem = {
      id: 'b-' + Date.now(),
      name: newItem.name,
      category: newItem.category,
      estimatedCost: est,
      actualCost: act,
      paid: newItem.paid,
      notes: newItem.notes
    };

    onUpdateBudget({
      ...budget,
      items: [...budget.items, item]
    });

    setNewItem({
      name: '',
      category: 'Venue & Rentals',
      estimatedCost: '',
      actualCost: '',
      paid: false,
      notes: ''
    });
    setShowAddModal(false);
  };

  const symbol = budget.currencySymbol;

  // Colors for category progress bar
  const categoryColors: Record<string, string> = {
    'Venue & Rentals': '#ec4899',
    'Loft Venue Rental': '#ec4899',
    'Venue & Location': '#ec4899',
    'Catering & Bar': '#f59e0b',
    'Craft Drinks & Finger Food': '#f59e0b',
    'Catering & Hospitality': '#f59e0b',
    'Photography & Video': '#06b6d4',
    'Photo & Cinematography': '#06b6d4',
    'Floral & Decor': '#10b981',
    'Neon Decor & Lighting': '#10b981',
    'Styling & Floral Decor': '#10b981',
    'Music & DJ': '#8b5cf6',
    'Arcade & DJ Sound': '#8b5cf6',
    'Music & Production': '#8b5cf6',
    'Permits & Safety': '#ef4444',
    'City Permits & Park Facility': '#ef4444'
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Allocated</span>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">
            {symbol}{budget.totalBudget.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400">Target Ceiling</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Committed / Spent</span>
          <div className="text-xl sm:text-2xl font-black text-fuchsia-400 mt-1">
            {symbol}{totalActual.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400">{percentUsed}% of total budget</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Remaining Buffer</span>
          <div className={`text-xl sm:text-2xl font-black mt-1 ${remaining >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {remaining >= 0 ? `${symbol}${remaining.toLocaleString()}` : `-${symbol}${Math.abs(remaining).toLocaleString()}`}
          </div>
          <span className="text-xs text-slate-400">{remaining >= 0 ? 'Under control' : 'Budget deficit!'}</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actually Paid</span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
            {symbol}{totalPaid.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400">{symbol}{(totalActual - totalPaid).toLocaleString()} pending payment</span>
        </div>
      </div>

      {/* 2. Visual Budget Progress Bar */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2.5">
          <span>Budget Burn Rate ({percentUsed}%)</span>
          <span>{symbol}{totalActual.toLocaleString()} / {symbol}{budget.totalBudget.toLocaleString()}</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden flex">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              percentUsed > 95
                ? 'bg-rose-500'
                : 'bg-gradient-to-r from-fuchsia-600 via-pink-500 to-amber-400'
            }`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      {/* 3. AI Cost-Saving Recommendations */}
      {budget.aiSavingsTips && budget.aiSavingsTips.length > 0 && (
        <div className="rounded-2xl p-5 border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-950/20 to-slate-900/50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-amber-300">AI Cost-Optimization Insights</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {budget.aiSavingsTips.map((tip, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/15 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-amber-400 block mb-1">Hack #{idx + 1}</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Itemized Expense Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-white">Itemized Expenses & Vendor Costs</h3>
            <p className="text-xs text-slate-400">Track quotes, confirmed payments, and item notes</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-md transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Expense / Service</th>
                <th className="pb-3">Category</th>
                <th className="pb-3 text-right">Estimated</th>
                <th className="pb-3 text-right">Actual</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {budget.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 pl-2">
                    <div className="font-medium text-slate-200">{item.name}</div>
                    {item.notes && <div className="text-[11px] text-slate-400 truncate max-w-xs">{item.notes}</div>}
                  </td>
                  <td className="py-3 text-slate-300">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 border border-slate-700/60">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-400 font-mono">
                    {symbol}{item.estimatedCost.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-semibold text-slate-100 font-mono">
                    {symbol}{item.actualCost.toLocaleString()}
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => togglePaid(item.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                        item.paid
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                      }`}
                    >
                      {item.paid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{item.paid ? 'Paid' : 'Pending'}</span>
                    </button>
                  </td>
                  <td className="py-3 pr-2 text-right">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                      title="Delete expense"
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

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add Custom Expense</h3>
            <form onSubmit={handleAddItem} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Item / Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding Cake Tier, DJ Lighting Package"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                >
                  <option value="Venue & Rentals">Venue & Rentals</option>
                  <option value="Catering & Bar">Catering & Bar</option>
                  <option value="Photography & Video">Photography & Video</option>
                  <option value="Floral & Decor">Floral & Decor</option>
                  <option value="Music & DJ">Music & DJ</option>
                  <option value="Permits & Safety">Permits & Safety</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Cost ({symbol})</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={newItem.estimatedCost}
                    onChange={(e) => setNewItem({ ...newItem, estimatedCost: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Actual / Final Cost ({symbol})</label>
                  <input
                    type="number"
                    placeholder="Leave empty if same"
                    value={newItem.actualCost}
                    onChange={(e) => setNewItem({ ...newItem, actualCost: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Vendor Details</label>
                <input
                  type="text"
                  placeholder="e.g. Deposit required by Friday"
                  value={newItem.notes}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="paidCheck"
                  checked={newItem.paid}
                  onChange={(e) => setNewItem({ ...newItem, paid: e.target.checked })}
                  className="rounded border-slate-700 text-fuchsia-600 focus:ring-fuchsia-500"
                />
                <label htmlFor="paidCheck" className="text-xs text-slate-300 font-medium">Already Paid Deposit or Full Amount</label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

