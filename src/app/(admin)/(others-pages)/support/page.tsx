"use client"
import React, { useState } from "react";

// SupportTicketsPage.tsx
// Next.js + TypeScript + Tailwind CSS
// This version is tuned to closely match the provided screenshots: exact spacing, card layout, badges, modal style,
// dashed upload area, floating chat bubble, and table row layout.

type Ticket = {
  id: string;
  title: string;
  subtitle?: string;
  client: string;
  project: string;
  status: "open" | "in progress" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  assignee: string;
  initials: string;
  lastUpdate: string;
};

const sampleTickets: Ticket[] = [
  { id: "ST-001", title: "Kitchen Cabinet Door Alignment Issue", subtitle: "Installation Issue", client: "Sarah Johnson", project: "Villa Renovation", status: "open", priority: "high", assignee: "Mike Chen", initials: "MC", lastUpdate: "2024-01-16" },
  { id: "ST-002", title: "Paint Touch-up Required in Living Room", subtitle: "Finishing", client: "David Wilson", project: "Apartment Design", status: "in progress", priority: "medium", assignee: "Lisa Park", initials: "LP", lastUpdate: "2024-01-17" },
  { id: "ST-003", title: "Electrical Outlet Not Working", subtitle: "Electrical", client: "Emma Davis", project: "Office Interior", status: "resolved", priority: "urgent", assignee: "John Smith", initials: "JS", lastUpdate: "2024-01-15" },
  { id: "ST-004", title: "Bathroom Tile Grout Cleaning", subtitle: "Maintenance", client: "Michael Brown", project: "Villa Renovation", status: "open", priority: "low", assignee: "Anna Lee", initials: "AL", lastUpdate: "2024-01-13" },
  { id: "ST-005", title: "Window Blind Installation", subtitle: "Installation", client: "Jennifer Taylor", project: "Apartment Design", status: "in progress", priority: "medium", assignee: "Mike Chen", initials: "MC", lastUpdate: "2024-01-16" },
  { id: "ST-006", title: "Flooring Warranty Claim", subtitle: "Warranty", client: "Robert Garcia", project: "Office Interior", status: "resolved", priority: "medium", assignee: "Lisa Park", initials: "LP", lastUpdate: "2024-01-14" },
];

function StatusBadge({ status }: { status: Ticket["status"] }) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm";
  if (status === "open") return <span className={`${base} bg-orange-50 text-orange-700`}>open</span>;
  if (status === "in progress") return <span className={`${base} bg-yellow-50 text-yellow-700`}>in progress</span>;
  return <span className={`${base} bg-green-50 text-green-700`}>resolved</span>;
}

function PriorityBadge({ priority }: { priority: Ticket["priority"] }) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm";
  if (priority === "low") return <span className={`${base} bg-sky-50 text-sky-700`}>low</span>;
  if (priority === "medium") return <span className={`${base} bg-amber-50 text-amber-700`}>medium</span>;
  if (priority === "high") return <span className={`${base} bg-orange-50 text-orange-700`}>high</span>;
  return <span className={`${base} bg-red-50 text-red-700`}>urgent</span>;
}

export default function SupportTicketsPage(): JSX.Element {
  const [tickets] = useState<Ticket[]>(sampleTickets);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filtered = tickets.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (search && !(`${t.id} ${t.title} ${t.client} ${t.assignee}`.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Support Tickets</h1>
            <p className="text-sm text-slate-500 mt-1">Manage post-handover support cases</p>
          </div>
          <div className="pt-1">
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="stroke-white" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Create Ticket
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="text-xs text-slate-400">Total Tickets</div>
            <div className="text-2xl font-bold text-slate-900">{tickets.length}</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="text-xs text-slate-400">Open</div>
            <div className="text-2xl font-bold text-slate-900">{tickets.filter((t) => t.status === 'open').length}</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="text-xs text-slate-400">In Progress</div>
            <div className="text-2xl font-bold text-slate-900">{tickets.filter((t) => t.status === 'in progress').length}</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="text-xs text-slate-400">Resolved</div>
            <div className="text-2xl font-bold text-slate-900">{tickets.filter((t) => t.status === 'resolved').length}</div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600">Status:</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded-md text-sm">
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600">Priority:</label>
              <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="border px-3 py-2 rounded-md text-sm">
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="flex-1 flex justify-end">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tickets..." className="border rounded-md px-3 py-2 text-sm w-full max-w-md" />
            </div>
          </div>
        </div>

        {/* Tickets Table Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg text-slate-900">Support Tickets</h2>
                <div className="text-sm text-slate-400">Showing {filtered.length} of {tickets.length} tickets</div>
              </div>
              <div className="text-sm text-slate-500">{/* empty for alignment like screenshot */}</div>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-left">
              <thead className="bg-transparent">
                <tr className="text-xs text-slate-500">
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Client & Project</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Assignee</th>
                  <th className="px-6 py-4">Last Update</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-6 py-5 align-top w-2/6">
                      <div className="text-sm font-semibold text-slate-900">{t.id}</div>
                      <div className="text-sm text-slate-600 mt-1">{t.title}</div>
                      {t.subtitle && <div className="text-xs text-slate-400 mt-1">{t.subtitle}</div>}
                    </td>
                    <td className="px-6 py-5 align-top w-2/6">
                      <div className="text-sm font-semibold">{t.client}</div>
                      <div className="text-sm text-slate-500 mt-1">{t.project}</div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-6 py-5 align-top">
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center text-sm font-semibold">{t.initials}</div>
                        <div className="text-sm text-slate-700">{t.assignee}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top text-sm text-slate-500">{t.lastUpdate}</td>
                    <td className="px-6 py-5 align-top text-right text-sm">
                      <div className="inline-flex items-center gap-4 text-slate-400">
                        <button className="hover:text-blue-600">⦿</button>
                        <button className="hover:text-yellow-600">✎</button>
                        <button className="hover:text-red-600">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Ticket Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />

            <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden" style={{ maxHeight: '88vh' }}>
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Create Support Ticket</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-500">✕</button>
              </div>

              <div className="p-6 overflow-auto" style={{ maxHeight: '72vh' }}>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="border rounded-md px-3 py-2 text-sm" placeholder="Ticket Title *" />
                    <select className="border rounded-md px-3 py-2 text-sm">
                      <option>Medium</option>
                      <option>Low</option>
                      <option>High</option>
                    </select>
                    <select className="border rounded-md px-3 py-2 text-sm">
                      <option>Select Client</option>
                      <option>Sarah Johnson</option>
                      <option>David Wilson</option>
                    </select>
                    <select className="border rounded-md px-3 py-2 text-sm">
                      <option>Select Project</option>
                      <option>Villa Renovation</option>
                      <option>Apartment Design</option>
                    </select>
                    <select className="border rounded-md px-3 py-2 text-sm">
                      <option>Select Category</option>
                      <option>Installation</option>
                      <option>Finishing</option>
                    </select>
                    <select className="border rounded-md px-3 py-2 text-sm">
                      <option>Assign Later</option>
                      <option>Mike Chen</option>
                    </select>
                  </div>

                  <textarea className="w-full border rounded-md px-3 py-2 text-sm h-28" placeholder="Detailed description of the issue or request" />

                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-sm text-slate-500">
                    <div className="flex flex-col items-center">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mb-2" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <div>Click to upload files or drag and drop</div>
                      <div className="text-xs mt-1">Images, PDF, DOC files up to 10MB each</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-md border">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white">Create</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
