"use client";

import { useState } from "react";
import { Upload, FileText, Search } from "lucide-react";

const categoriesData = [
  { name: "All Documents", count: 6 },
  { name: "Contracts", count: 1 },
  { name: "Design Plans", count: 1 },
  { name: "Permits", count: 1 },
  { name: "Invoices", count: 1 },
  { name: "Photos", count: 1 },
];

const documentsData = [
  {
    name: "Project Contract.pdf",
    size: "2.4 MB",
    date: "11/1/2023",
    uploadedBy: "John Smith",
  },
  {
    name: "Kitchen Design Plans.dwg",
    size: "15.2 MB",
    date: "11/5/2023",
    uploadedBy: "Sarah Wilson",
  },
  {
    name: "Electrical Permit.pdf",
    size: "1.8 MB",
    date: "11/20/2023",
    uploadedBy: "Mike Johnson",
  },
  {
    name: "Material Invoice - Cabinets.pdf",
    size: "890 KB",
    date: "12/15/2023",
    uploadedBy: "John Smith",
  },
  {
    name: "Progress Photos - Week 8.zip",
    size: "45.6 MB",
    date: "1/8/2024",
    uploadedBy: "Mike Johnson",
  },
  {
    name: "Change Order #1.pdf",
    size: "1.2 MB",
    date: "1/10/2024",
    uploadedBy: "John Smith",
  },
];

const activityData = [
  { action: "Change Order #1.pdf uploaded", by: "John Smith", time: "2 hours ago" },
  { action: "Progress Photos - Week 8.zip uploaded", by: "Mike Johnson", time: "1 day ago" },
  { action: "Material Invoice - Cabinets.pdf viewed", by: "Sarah Wilson", time: "2 days ago" },
];

export default function DocumentsTab() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Documents");

  const filteredDocuments = documentsData.filter((doc) => {
    const matchesCategory =
      selectedCategory === "All Documents" ||
      doc.name.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="space-y-4">
        <h3 className="font-semibold text-gray-800">Document Categories</h3>

        <div className="space-y-2">
          {categoriesData.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full flex justify-between items-center text-sm px-3 py-2 rounded-md border transition ${
                selectedCategory === cat.name
                  ? "bg-blue-50 text-blue-700 border-blue-200 font-medium"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-gray-500">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mt-6">
          <Upload className="mx-auto text-gray-400 w-10 h-10 mb-2" />
          <p className="font-medium text-gray-700">Upload Document</p>
          <p className="text-sm text-gray-500 mt-1">
            Drop files here or{" "}
            <span className="text-blue-600 font-medium cursor-pointer">browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supports: PDF, DOC, DWG, JPG, PNG, ZIP (Max 50MB)
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <section className="lg:col-span-3 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-semibold text-gray-800 text-lg">Project Documents</h3>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 w-full border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Document List */}
        <div className="border rounded-lg divide-y">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {doc.size} • Uploaded {doc.date} • by {doc.uploadedBy}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-6">No documents found.</p>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Recent Document Activity</h3>
          <div className="space-y-3">
            {activityData.map((a, i) => (
              <div key={i} className="p-4 bg-gray-50 border rounded-lg">
                <p className="text-sm font-medium text-gray-700">{a.action}</p>
                <p className="text-xs text-gray-500">
                  by {a.by} • {a.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
