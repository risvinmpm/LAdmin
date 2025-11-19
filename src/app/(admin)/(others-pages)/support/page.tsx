"use client";
import React, { JSX, useMemo, useState } from "react";
import {
  Plus,
  Bell,
  Search,
  Eye,
  PencilLine,
  Trash2,
  UploadCloud,
  X,
  Check,
  Clock3,
  AlertCircle,
} from "lucide-react";

// --------- Types
type Status = "open" | "in progress" | "resolved";
type Priority = "low" | "medium" | "high" | "urgent";

type Ticket = {
  id: string;
  code: string;
  title: string;
  category: string;
  client: string;
  project: string;
  status: Status;
  priority: Priority;
  assignee: { name: string; initials: string };
  lastUpdate: string;
};

// --------- Dummy Data (matches screenshots)
const TICKETS: Ticket[] = [
  {
    id: "1",
    code: "ST-001",
    title: "Kitchen Cabinet Door Alignment Issue",
    category: "Installation Issue",
    client: "Sarah Johnson",
    project: "Villa Renovation",
    status: "open",
    priority: "high",
    assignee: { name: "Mike Chen", initials: "MC" },
    lastUpdate: "2024-01-16",
  },
  {
    id: "2",
    code: "ST-002",
    title: "Paint Touch-up Required in Living Room",
    category: "Finishing",
    client: "David Wilson",
    project: "Apartment Design",
    status: "in progress",
    priority: "medium",
    assignee: { name: "Lisa Park", initials: "LP" },
    lastUpdate: "2024-01-17",
  },
  {
    id: "3",
    code: "ST-003",
    title: "Electrical Outlet Not Working",
    category: "Electrical",
    client: "Emma Davis",
    project: "Office Interior",
    status: "resolved",
    priority: "urgent",
    assignee: { name: "John Smith", initials: "JS" },
    lastUpdate: "2024-01-15",
  },
  {
    id: "4",
    code: "ST-004",
    title: "Bathroom Tile Grout Cleaning",
    category: "Maintenance",
    client: "Michael Brown",
    project: "Villa Renovation",
    status: "open",
    priority: "low",
    assignee: { name: "Anna Lee", initials: "AL" },
    lastUpdate: "2024-01-13",
  },
  {
    id: "5",
    code: "ST-005",
    title: "Window Blind Installation",
    category: "Installation",
    client: "Jennifer Taylor",
    project: "Apartment Design",
    status: "in progress",
    priority: "medium",
    assignee: { name: "Mike Chen", initials: "MC" },
    lastUpdate: "2024-01-16",
  },
  {
    id: "6",
    code: "ST-006",
    title: "Flooring Warranty Claim",
    category: "Warranty",
    client: "Robert Garcia",
    project: "Office Interior",
    status: "resolved",
    priority: "medium",
    assignee: { name: "Lisa Park", initials: "LP" },
    lastUpdate: "2024-01-14",
  },
];

// --------- Small UI helpers
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

function Badge({
  children,
  tone = "gray",
}: {
  children: React.ReactNode;
  tone?:
    | "gray"
    | "yellow"
    | "green"
    | "red"
    | "blue"
    | "orange"
    | "neutral"
    | "mint"
    | "peach";
}) {
  const tones: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
    yellow: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200",
    green: "bg-green-100 text-green-700 ring-1 ring-green-200",
    red: "bg-red-100 text-red-700 ring-1 ring-red-200",
    blue: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    orange: "bg-orange-100 text-orange-700 ring-1 ring-orange-200",
    neutral: "bg-stone-100 text-stone-700 ring-1 ring-stone-200",
    mint: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
    peach: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

function StatusBadge({ value }: { value: Status }) {
  if (value === "open") return <Badge tone="neutral">open</Badge>;
  if (value === "in progress") return <Badge tone="yellow">in progress</Badge>;
  return <Badge tone="green">resolved</Badge>;
}

function PriorityBadge({ value }: { value: Priority }) {
  if (value === "urgent") return <span className="inline-flex rounded-full bg-rose-100 text-rose-700 ring-1 ring-rose-200 px-2.5 py-1 text-xs font-medium">urgent</span>;
  if (value === "high") return <Badge tone="orange">high</Badge>;
  if (value === "medium") return <Badge tone="yellow">medium</Badge>;
  return <Badge tone="blue">low</Badge>;
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold shadow-sm">
      {initials}
    </span>
  );
}

// --------- Page
export default function SupportTicketsPage(): JSX.Element {
  const [status, setStatus] = useState<"All Statuses" | Status>("All Statuses");
  const [priority, setPriority] = useState<"All Priorities" | Priority>("All Priorities");
  const [project, setProject] = useState<"All Projects" | string>("All Projects");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const totals = useMemo(() => {
    const total = TICKETS.length + 18; 
    const open = TICKETS.filter((t) => t.status === "open").length + 4; 
    const inProg = TICKETS.filter((t) => t.status === "in progress").length; 
    const resolved = TICKETS.filter((t) => t.status === "resolved").length;
    return { total, open, inProg, resolved };
  }, []);

  const projects = useMemo(() => ["All Projects", "Villa Renovation", "Apartment Design", "Office Interior"], []);

  const filtered = useMemo(() => {
    return TICKETS.filter((t) => {
      const matchStatus = status === "All Statuses" ? true : t.status === status;
      const matchPriority = priority === "All Priorities" ? true : t.priority === priority;
      const matchProject = project === "All Projects" ? true : t.project === project;
      const q = query.trim().toLowerCase();
      const matchQuery = !q
        ? true
        : [t.code, t.title, t.client, t.project, t.category, t.assignee.name]
            .join(" ")
            .toLowerCase()
            .includes(q);
      return matchStatus && matchPriority && matchProject && matchQuery;
    });
  }, [status, priority, project, query]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-gray-900">
      <div className="mx-auto w-full  py-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">Support Tickets</h1>
            <p className="text-sm text-gray-500">Manage post-handover support cases</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[#1E5EFF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#184BCE] focus:outline-none"
          >
            <Plus className="h-4 w-4" />
            Create Ticket
          </button>
        </div>

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total Tickets</span>
              <div className="h-9 w-9 rounded-lg bg-blue-50 grid place-items-center">
                {/* Simple ticket icon */}
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" d="M3 7a2 2 0 012-2h8l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold">{totals.total}</div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Open</span>
              <div className="h-9 w-9 rounded-lg bg-orange-50 grid place-items-center">
                <Clock3 className="h-5 w-5 text-orange-500" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold">{totals.open}</div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">In Progress</span>
              <div className="h-9 w-9 rounded-lg bg-yellow-50 grid place-items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold">{totals.inProg}</div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Resolved</span>
              <div className="h-9 w-9 rounded-lg bg-green-50 grid place-items-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold">{totals.resolved}</div>
          </div>
        </div>

        {/* Filters row */}
        <div className="mt-6 rounded-xl border bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <select
                  className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <option>All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Priority:</span>
                <select
                  className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                >
                  <option>All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Project:</span>
                <select
                  className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  {projects.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Search tickets..."
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
          <div className="rounded-t-xl border border-b-0 bg-white px-5 pt-4">
            <h2 className="text-lg font-semibold">Support Tickets</h2>
            <p className="mt-0.5 text-sm text-gray-500">Showing {filtered.length} of {TICKETS.length} tickets</p>
          </div>

          <div className="overflow-x-auto rounded-b-xl border">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr className="text-left text-[13px] text-gray-500">
                  <th className="py-3.5 pl-6 pr-3 font-medium">TICKET</th>
                  <th className="px-3 font-medium">CLIENT & PROJECT</th>
                  <th className="px-3 font-medium">STATUS</th>
                  <th className="px-3 font-medium">PRIORITY</th>
                  <th className="px-3 font-medium">ASSIGNEE</th>
                  <th className="px-3 font-medium">LAST UPDATE</th>
                  <th className="py-3.5 pr-6 pl-3 text-right font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50">
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 align-top">
                      <div className="font-semibold text-gray-900">{t.code}</div>
                      <div className="text-gray-700">{t.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.category}</div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 align-top">
                      <div className="font-medium text-gray-900">{t.client}</div>
                      <div className="text-sm text-gray-500">{t.project}</div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 align-top">
                      <StatusBadge value={t.status} />
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 align-top">
                      <PriorityBadge value={t.priority} />
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <Avatar initials={t.assignee.initials} />
                        <span className="text-gray-800">{t.assignee.name}</span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 align-top text-gray-700">{t.lastUpdate}</td>

                    <td className="whitespace-nowrap py-4 pr-6 pl-3 align-top">
                      <div className="flex items-center justify-end gap-3 text-gray-500">
                        <button title="View">
                          <Eye className="h-4 w-4 hover:text-gray-700" />
                        </button>
                        <button title="Edit">
                          <PencilLine className="h-4 w-4 hover:text-gray-700" />
                        </button>
                        <button title="Delete">
                          <Trash2 className="h-4 w-4 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating chat bubble */}
      <button
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90"
        title="Talk with Us"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">🤖</span>
        Talk with Us
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="pointer-events-auto absolute inset-0 grid place-items-center p-4">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Create Support Ticket</h3>
                <button onClick={() => setShowModal(false)} className="rounded-md p-1 hover:bg-gray-100">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Body (scrollable) */}
              <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Ticket Title *</label>
                    <input className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief description of the issue" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Priority *</label>
                    <select className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" defaultValue="Medium">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Client *</label>
                    <select className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Client</option>
                      <option>Sarah Johnson</option>
                      <option>David Wilson</option>
                      <option>Emma Davis</option>
                      <option>Michael Brown</option>
                      <option>Jennifer Taylor</option>
                      <option>Robert Garcia</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Project *</label>
                    <select className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Project</option>
                      <option>Villa Renovation</option>
                      <option>Apartment Design</option>
                      <option>Office Interior</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Category *</label>
                    <select className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Category</option>
                      <option>Installation</option>
                      <option>Finishing</option>
                      <option>Electrical</option>
                      <option>Maintenance</option>
                      <option>Warranty</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Assign To</label>
                    <select className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Assign Later</option>
                      <option>Mike Chen</option>
                      <option>Lisa Park</option>
                      <option>John Smith</option>
                      <option>Anna Lee</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Description *</label>
                    <textarea
                      rows={5}
                      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Detailed description of the issue or request"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Attachments</label>
                    <label
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400"
                    >
                      <UploadCloud className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-700">Click to upload files or drag and drop</span>
                      <span className="mt-1 text-xs text-gray-500">Images, PDF, DOC files up to 10MB each</span>
                      <input type="file" className="hidden" multiple />
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
                <button onClick={() => setShowModal(false)} className="h-10 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button className="h-10 rounded-md bg-[#1E5EFF] px-4 text-sm font-semibold text-white hover:bg-[#184BCE]">
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
