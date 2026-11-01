import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Circle, Plus, Printer, ShieldAlert, UserCheck } from 'lucide-react';
import { MilestoneItem, RunOfShowItem } from '../types';

interface TimelineViewProps {
  milestones: MilestoneItem[];
  runOfShow: RunOfShowItem[];
  onUpdateMilestones: (updated: MilestoneItem[]) => void;
  onUpdateRunOfShow: (updated: RunOfShowItem[]) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  milestones,
  runOfShow,
  onUpdateMilestones,
  onUpdateRunOfShow
}) => {
  const [activeTab, setActiveTab] = useState<'milestones' | 'runOfShow'>('runOfShow');
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showAddRunOfShow, setShowAddRunOfShow] = useState(false);

  // New milestone state
  const [newMilestone, setNewMilestone] = useState({
    phase: '1 Month Before',
    task: '',
    category: 'Coordination',
    priority: 'high' as 'high' | 'medium' | 'low'
  });

  // New run of show state
  const [newRunItem, setNewRunItem] = useState({
    time: '12:00 PM',
    title: '',
    description: '',
    owner: 'Host / Coordinator'
  });

  const toggleMilestone = (id: string) => {
    onUpdateMilestones(
      milestones.map(m => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const toggleRunItem = (id: string) => {
    onUpdateRunOfShow(
      runOfShow.map(r => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.task) return;
    const item: MilestoneItem = {
      id: 'm-' + Date.now(),
      phase: newMilestone.phase,
      task: newMilestone.task,
      category: newMilestone.category,
      priority: newMilestone.priority,
      completed: false
    };
    onUpdateMilestones([...milestones, item]);
    setNewMilestone({ phase: '1 Month Before', task: '', category: 'Coordination', priority: 'high' });
    setShowAddMilestone(false);
  };

  const handleAddRunItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRunItem.title) return;
    const item: RunOfShowItem = {
      id: 'r-' + Date.now(),
      time: newRunItem.time,
      title: newRunItem.title,
      description: newRunItem.description,
      owner: newRunItem.owner,
      completed: false
    };
    onUpdateRunOfShow([...runOfShow, item]);
    setNewRunItem({ time: '12:00 PM', title: '', description: '', owner: 'Host / Coordinator' });
    setShowAddRunOfShow(false);
  };

  const printSchedule = () => {
    window.print();
  };

  // Group milestones by phase
  const groupedMilestones = milestones.reduce((acc, m) => {
    if (!acc[m.phase]) acc[m.phase] = [];
    acc[m.phase].push(m);
    return acc;
  }, {} as Record<string, MilestoneItem[]>);

  return (
    <div className="space-y-6">
      
      {/* Top View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('runOfShow')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'runOfShow'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Day-of Run of Show</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full">{runOfShow.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('milestones')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'milestones'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Countdown Milestones</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full">{milestones.length}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'runOfShow' ? (
            <>
              <button
                onClick={printSchedule}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                <Printer className="w-3.5 h-3.5 text-pink-400" />
                <span>Print Agenda</span>
              </button>
              <button
                onClick={() => setShowAddRunOfShow(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-xs font-semibold text-white transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Time Slot</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAddMilestone(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-xs font-semibold text-white transition shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Milestone</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: Day-of Run of Show */}
      {activeTab === 'runOfShow' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800">
          <div className="mb-4">
            <h3 className="text-base font-bold text-white">Minute-by-Minute Master Schedule</h3>
            <p className="text-xs text-slate-400">Keep vendors, coordinators, and hosts in complete sync throughout the celebration.</p>
          </div>

          <div className="relative border-l-2 border-fuchsia-500/30 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6">
            {runOfShow.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline node */}
                <button
                  onClick={() => toggleRunItem(item.id)}
                  className={`absolute -left-[27px] sm:-left-[35px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    item.completed
                      ? 'bg-fuchsia-600 border-fuchsia-400 text-white shadow-lg shadow-fuchsia-600/40'
                      : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-fuchsia-400'
                  }`}
                >
                  {item.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                </button>

                {/* Content Card */}
                <div
                  className={`p-4 rounded-xl border transition ${
                    item.completed
                      ? 'bg-slate-900/30 border-slate-800/60 opacity-60'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                        {item.time}
                      </span>
                      <h4 className={`text-sm font-bold ${item.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <UserCheck className="w-3 h-3 text-pink-400" />
                      <span className="font-medium text-slate-300">{item.owner}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed pl-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Countdown Milestones */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          {Object.entries(groupedMilestones).map(([phase, items]) => (
            <div key={phase} className="glass-card rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-fuchsia-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{phase}</h4>
                </div>
                <span className="text-xs text-slate-400">
                  {items.filter(i => i.completed).length} of {items.length} done
                </span>
              </div>

              <div className="space-y-2.5">
                {items.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(m.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                      m.completed
                        ? 'bg-slate-900/30 border-slate-800/60 opacity-60'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button className="text-slate-400">
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                      <div>
                        <span className={`text-xs sm:text-sm font-medium ${m.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                          {m.task}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500">{m.category}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        m.priority === 'high'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : m.priority === 'medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {m.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Run of Show item */}
      {showAddRunOfShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add Day-of Schedule Slot</h3>
            <form onSubmit={handleAddRunItem} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time (e.g. 05:00 PM)</label>
                  <input
                    type="text"
                    required
                    value={newRunItem.time}
                    onChange={(e) => setNewRunItem({ ...newRunItem, time: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Responsible Lead / Owner</label>
                  <input
                    type="text"
                    required
                    value={newRunItem.owner}
                    onChange={(e) => setNewRunItem({ ...newRunItem, owner: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Event Action / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cake Cutting & Champagne Toast"
                  value={newRunItem.title}
                  onChange={(e) => setNewRunItem({ ...newRunItem, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description & Cues</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Dim main chandelier lights, DJ queues track 4, sparkler candles lit."
                  value={newRunItem.description}
                  onChange={(e) => setNewRunItem({ ...newRunItem, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddRunOfShow(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
                >
                  Add Time Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Milestone */}
      {showAddMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Add Planning Milestone</h3>
            <form onSubmit={handleAddMilestone} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Timeframe Phase</label>
                <select
                  value={newMilestone.phase}
                  onChange={(e) => setNewMilestone({ ...newMilestone, phase: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                >
                  <option value="6 Months Before">6 Months Before</option>
                  <option value="4 Months Before">4 Months Before</option>
                  <option value="2 Months Before">2 Months Before</option>
                  <option value="1 Month Before">1 Month Before</option>
                  <option value="2 Weeks Before">2 Weeks Before</option>
                  <option value="1 Week Before">1 Week Before</option>
                  <option value="Day Before">Day Before</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Milestone Task</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Confirm final guest seating layout"
                  value={newMilestone.task}
                  onChange={(e) => setNewMilestone({ ...newMilestone, task: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Venue, Catering, Decor"
                    value={newMilestone.category}
                    onChange={(e) => setNewMilestone({ ...newMilestone, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={newMilestone.priority}
                    onChange={(e) => setNewMilestone({ ...newMilestone, priority: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fuchsia-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddMilestone(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

