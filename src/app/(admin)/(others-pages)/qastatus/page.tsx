"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Download,
  Edit3,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ChecklistItem {
  label: string;
  result: string;
}

interface Inspection {
  id: number;
  project: string;
  phase: string;
  inspector: string;
  date: string;
  issues: number;
  status: "Passed" | "Failed" | "Warning" | "Pending";
  notes: string;
  score: number;
}

const checklistTemplate: ChecklistItem[] = [
  { label: "General Cleanliness", result: "Passed" },
  { label: "Equipment Condition", result: "Passed" },
  { label: "Safety Compliance", result: "Passed" },
  { label: "Material Quality", result: "Passed" },
  { label: "Documentation", result: "Passed" },
];

const inspectionsData: Inspection[] = [
  {
    id: 1,
    project: "Johnson Residence Kitchen",
    phase: "Foundation Phase",
    inspector: "Sarah Wilson",
    date: "1/10/2024",
    issues: 0,
    status: "Passed",
    notes: "Foundation meets all structural requirements. Excellent workmanship.",
    score: 95,
  },
  {
    id: 2,
    project: "Smith Office Building",
    phase: "Electrical Phase",
    inspector: "Mike Chen",
    date: "1/8/2024",
    issues: 2,
    status: "Warning",
    notes: "Minor electrical code violations found. Requires correction before final approval.",
    score: 78,
  },
  {
    id: 3,
    project: "Davis Apartment Complex",
    phase: "Plumbing Phase",
    inspector: "Lisa Rodriguez",
    date: "1/5/2024",
    issues: 4,
    status: "Failed",
    notes: "Multiple plumbing violations. Work must be redone and re-inspected.",
    score: 65,
  },
  {
    id: 4,
    project: "Wilson Retail Store",
    phase: "HVAC Phase",
    inspector: "John Adams",
    date: "1/3/2024",
    issues: 0,
    status: "Pending",
    notes: "Inspection scheduled next week.",
    score: 0,
  },
];

export default function QAStatusPage() {
  const [filter, setFilter] = useState<"All" | "Passed" | "Failed" | "Warning" | "Pending">("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredInspections = inspectionsData.filter((insp) => {
    const matchesFilter = filter === "All" || insp.status === filter;
    const matchesSearch =
      insp.project.toLowerCase().includes(search.toLowerCase()) ||
      insp.inspector.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: inspectionsData.length,
    passed: inspectionsData.filter((i) => i.status === "Passed").length,
    failed: inspectionsData.filter((i) => i.status === "Failed").length,
    warning: inspectionsData.filter((i) => i.status === "Warning").length,
    pending: inspectionsData.filter((i) => i.status === "Pending").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">QA Status</h1>
          <p className="text-sm text-gray-500">Quality assurance inspection tracking</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center gap-2">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Stat label="Total Inspections" value={stats.total} />
        <Stat label="Passed" value={stats.passed} color="text-green-600" />
        <Stat label="Failed" value={stats.failed} color="text-red-600" />
        <Stat label="Warning" value={stats.warning} color="text-yellow-600" />
        <Stat label="Pending" value={stats.pending} color="text-gray-600" />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {["All", "Passed", "Failed", "Warning", "Pending"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-1.5 text-sm rounded-md border ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects or inspectors"
            className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Inspection Cards */}
      <div className="space-y-4">
        {filteredInspections.map((insp) => (
          <div
            key={insp.id}
            className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between">
              {/* Left Info */}
              <div>
                <div className="flex items-center gap-2">
                  {insp.status === "Passed" && (
                    <CheckCircle className="text-green-500 w-5 h-5" />
                  )}
                  {insp.status === "Failed" && <XCircle className="text-red-500 w-5 h-5" />}
                  {insp.status === "Warning" && (
                    <AlertTriangle className="text-yellow-500 w-5 h-5" />
                  )}
                  {insp.status === "Pending" && <Clock className="text-gray-400 w-5 h-5" />}
                  <h2 className="font-semibold text-lg">{insp.project}</h2>
                </div>
                <p className="text-gray-500 text-sm">{insp.phase}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 text-sm mt-3 text-gray-700">
                  <p>
                    <strong>Inspector:</strong> {insp.inspector}
                  </p>
                  <p>
                    <strong>Date:</strong> {insp.date}
                  </p>
                  <p>
                    <strong>Issues:</strong> {insp.issues}
                  </p>
                </div>

                <p className="mt-2 text-sm text-gray-700">{insp.notes}</p>

                {/* View Details for all */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === insp.id ? null : insp.id)
                  }
                  className="mt-2 text-blue-600 text-sm flex items-center gap-1"
                >
                  {expandedId === insp.id ? (
                    <>
                      <ChevronUp size={16} /> Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} /> View Details
                    </>
                  )}
                </button>

                {expandedId === insp.id && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm font-medium mb-2">Quality Checklist</p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {checklistTemplate.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border rounded-md px-3 py-1 text-sm"
                        >
                          <span>{item.label}</span>
                          <span className="text-green-600 font-medium">{item.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side */}
              <div className="text-right flex flex-col justify-between">
                <div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      insp.status === "Passed"
                        ? "bg-green-100 text-green-700"
                        : insp.status === "Failed"
                        ? "bg-red-100 text-red-700"
                        : insp.status === "Warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {insp.status}
                  </span>
                  <p className="font-semibold text-lg mt-1">{insp.score}%</p>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  <button className="flex items-center gap-1 text-gray-600 text-sm border px-2 py-1 rounded-md hover:bg-gray-50">
                    <Download className="w-4 h-4" /> Export
                  </button>
                  <button className="flex items-center gap-1 text-blue-600 text-sm border px-2 py-1 rounded-md hover:bg-blue-50">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="bg-white border rounded-lg text-center p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-2xl font-semibold ${color || "text-gray-800"}`}>{value}</h3>
    </div>
  );
}
