"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  Edit2,
  Download,
  Users,
  Briefcase,
  TrendingUp,
  Target,
  ChevronDown,
} from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "Active" | "Inactive" | "Potential";
  projects: number;
  totalValue: string;
  address?: string;
  joined?: string;
  projectType?: string;
  budgetRange?: string;
  leadSource?: string;
  notes?: string;
  recentActivity?: { message: string; date: string }[];
}

const clients: Client[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "Bangalore, Karnataka",
    status: "Active",
    projects: 2,
    totalValue: "₹45.0L",
    address: "123 MG Road, Bangalore, Karnataka - 560001",
    joined: "1/15/2024",
    projectType: "Residential Villa",
    budgetRange: "40-50 Lakhs",
    leadSource: "Referral",
    notes: "Premium client, prefers modern designs",
    recentActivity: [
      { message: "Phone call regarding project updates", date: "12/10/2024 at 2:30 PM" },
      { message: "Sent project proposal and timeline", date: "12/8/2024 at 10:15 AM" },
    ],
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    location: "Bangalore, Karnataka",
    status: "Active",
    projects: 1,
    totalValue: "₹28.0L",
    address: "45 Residency Road, Bangalore - 560025",
    joined: "3/10/2024",
    projectType: "Apartment Interior",
    budgetRange: "20-30 Lakhs",
    leadSource: "Website Inquiry",
    notes: "Likes minimalistic interiors",
    recentActivity: [
      { message: "Follow-up call scheduled for 10/15/2024", date: "10/10/2024 at 3:00 PM" },
      { message: "Sent design concepts and quotes", date: "10/8/2024 at 12:30 PM" },
    ],
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    location: "Mumbai, Maharashtra",
    status: "Active",
    projects: 3,
    totalValue: "₹72.0L",
    address: "32 Marine Drive, Mumbai - 400001",
    joined: "2/5/2024",
    projectType: "Commercial Office",
    budgetRange: "60-75 Lakhs",
    leadSource: "Social Media",
    notes: "Corporate project, prefers modern workspace design",
    recentActivity: [
      { message: "Meeting scheduled for design review", date: "11/5/2024 at 11:00 AM" },
      { message: "Approved budget proposal", date: "10/25/2024 at 9:30 AM" },
    ],
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 65432 10987",
    location: "Hyderabad, Telangana",
    status: "Potential",
    projects: 0,
    totalValue: "₹0.0L",
    address: "Plot 24, Jubilee Hills, Hyderabad - 500033",
    joined: "N/A",
    projectType: "Residential Apartment",
    budgetRange: "30-40 Lakhs",
    leadSource: "Google Ads",
    notes: "Requested brochure and pricing details",
    recentActivity: [
      { message: "Sent brochure and sample portfolio", date: "9/15/2024 at 4:00 PM" },
    ],
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 54321 09876",
    location: "Chandigarh, Punjab",
    status: "Inactive",
    projects: 1,
    totalValue: "₹32.0L",
    address: "45 Sector 8, Chandigarh - 160009",
    joined: "11/1/2023",
    projectType: "Retail Store Design",
    budgetRange: "25-35 Lakhs",
    leadSource: "Referral",
    notes: "Project completed successfully; awaiting testimonial",
    recentActivity: [
      { message: "Sent final project invoice", date: "8/10/2024 at 10:00 AM" },
      { message: "Completed project handover", date: "7/28/2024 at 5:30 PM" },
    ],
  },
];

export default function ClientDashboard() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive" | "Potential">(
    "All"
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredClients = clients.filter((c) => {
    const matchesSearch = [c.name, c.email, c.phone].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    );
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <p className="text-gray-500">Manage your clients and track their projects</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { title: "Total Clients", value: "5", change: "+12%", icon: Users },
          { title: "Active Clients", value: "3", change: "+8%", icon: Briefcase },
          { title: "Potential Clients", value: "1", change: "+15%", icon: Target },
          { title: "Total Revenue", value: "₹177.0L", change: "+22%", icon: TrendingUp },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg p-4 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-lg font-semibold text-gray-800">{card.value}</h3>
              <p className="text-xs text-green-600 font-medium">{card.change} vs last month</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <card.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white border p-3 rounded-md shadow-sm gap-3 relative">
        <div className="flex items-center w-full sm:w-1/2 gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search clients by name, email, or phone..."
            className="w-full outline-none text-sm text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md border hover:bg-gray-200"
            >
              {statusFilter} Status <ChevronDown size={14} className="ml-1" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-10 w-36">
                {["All", "Active", "Inactive", "Potential"].map((status) => (
                  <div
                    key={status}
                    onClick={() => {
                      setStatusFilter(status as any);
                      setShowDropdown(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                      statusFilter === status ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md border hover:bg-gray-200">
            <Download size={14} className="mr-1" /> Export
          </button>
          <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Add New Client
          </button>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="col-span-2 bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="border-b px-5 py-3 font-medium text-gray-700">
            Client List{" "}
            <span className="text-sm text-gray-400">(Showing {filteredClients.length} clients)</span>
          </div>
          <div className="divide-y">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`p-4 flex justify-between items-start hover:bg-blue-50 cursor-pointer ${
                  selectedClient?.id === client.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
                }`}
              >
                <div className="flex gap-3 items-start w-full">
                  <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-medium">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-800">{client.name}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          client.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : client.status === "Inactive"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{client.email}</p>
                    <div className="mt-2 grid grid-cols-2 text-xs text-gray-600 gap-y-1">
                      <p>
                        <b>Phone:</b> {client.phone}
                      </p>
                      <p>
                        <b>Location:</b> {client.location}
                      </p>
                      <p>
                        <b>Projects:</b> {client.projects} projects
                      </p>
                      <p>
                        <b>Total Value:</b> {client.totalValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-white border rounded-lg shadow-sm p-5">
          {selectedClient ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center font-medium text-lg">
                  {selectedClient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{selectedClient.name}</h2>
                  <p className="text-sm text-gray-600">{selectedClient.email}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedClient.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : selectedClient.status === "Inactive"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedClient.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700">
                  <Phone size={16} /> Call
                </button>
                <button className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                  <Mail size={16} /> Email
                </button>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>📞 {selectedClient.phone}</p>
                <p>📍 {selectedClient.address}</p>
                <p>🗓 Client since {selectedClient.joined}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Project Information</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <b>Project Type:</b> {selectedClient.projectType}
                  </p>
                  <p>
                    <b>Budget Range:</b> {selectedClient.budgetRange}
                  </p>
                  <p>
                    <b>Lead Source:</b> {selectedClient.leadSource}
                  </p>
                  <p>
                    <b>Total Projects:</b> {selectedClient.projects}
                  </p>
                  <p>
                    <b>Total Value:</b> {selectedClient.totalValue}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Notes</h3>
                <p className="text-sm text-gray-600">
                  {selectedClient.notes || "No notes available."}
                </p>
                <button className="flex items-center gap-1 text-xs text-blue-600 mt-1 hover:text-blue-800">
                  <Edit2 size={12} /> Edit Notes
                </button>
              </div>

              {/* Recent Activity */}
              {selectedClient.recentActivity && selectedClient.recentActivity.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Recent Activity</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedClient.recentActivity.map((activity, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 bg-gray-50 border rounded-md p-2 hover:bg-blue-50"
                      >
                        <div className="text-blue-600 mt-0.5">•</div>
                        <div>
                          <p>{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p className="text-5xl mb-2">👤</p>
              <p className="font-medium">Select a Client</p>
              <p className="text-sm">Choose a client from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
