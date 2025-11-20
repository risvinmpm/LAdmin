"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Clock, CheckCircle2, AlertCircle, PencilLine, Trash2 } from "lucide-react";
import ProgressBar from "../../main/ProgressBar";
import RecentUpdates from "../../main/RecentUpdates";
// import DocumentsTab from "../../main/DocumentsTab";
import EditableTimeline from "../../main/EditableTimeline";
import Swal from "sweetalert2";

const projects = [
  {
    id: 1,
    name: "Johnson Residence Kitchen",
    client: "Michael Johnson",
    priority: "HIGH",
    status: "ACTIVE",
    phase: "Carpentry",
    progress: 85,
    total: 45000,
    paid: 35000,
    balance: 10000,
    nextPayment: "1/15/2024",
    overdue: true,
  },
  {
    id: 2,
    name: "Miller Kitchen Renovation",
    client: "Sarah Miller",
    priority: "MEDIUM",
    status: "ACTIVE",
    phase: "Painting",
    progress: 60,
    total: 32000,
    paid: 20000,
    balance: 12000,
    nextPayment: "1/20/2024",
    overdue: true,
  },
  {
    id: 3,
    name: "Davis Bathroom Remodel",
    client: "Robert Davis",
    priority: "MEDIUM",
    status: "ACTIVE",
    phase: "Electrical",
    progress: 4,
    total: 28000,
    paid: 15000,
    balance: 13000,
    nextPayment: "1/25/2024",
    overdue: true,
  },
  {
    id: 4,
    name: "Wilson Living Room",
    client: "Jennifer Wilson",
    priority: "LOW",
    status: "ACTIVE",
    phase: "Design",
    progress: 20,
    total: 55000,
    paid: 10000,
    balance: 45000,
    nextPayment: "2/10/2024",
    overdue: false,
  },
  {
    id: 5,
    name: "Anderson Kitchen",
    client: "Mark Anderson",
    priority: "LOW",
    status: "COMPLETED",
    phase: "Completed",
    progress: 100,
    total: 38000,
    paid: 38000,
    balance: 0,
    nextPayment: "—",
    overdue: false,
  },
];

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));
  const [activeTab, setActiveTab] = useState("Overview");

  // --------------------------------------------------
  // Payment modal & history state (persisted to localStorage)
  // --------------------------------------------------
  const STORAGE_KEY = project ? `payments_project_${project.id}` : "payments_project_unknown";

  // default payments (same entries you used originally)
  const defaultPayments = [
    {
      id: "static-1",
      date: "11/1/2023",
      description: "Initial deposit",
      method: "Bank Transfer",
      amount: 10000,
      status: "Completed",
    },
    {
      id: "static-2",
      date: "12/1/2023",
      description: "Phase 1 completion",
      method: "Check",
      amount: 15000,
      status: "Completed",
    },
    {
      id: "static-3",
      date: "1/5/2024",
      description: "Phase 2 milestone",
      method: "Bank Transfer",
      amount: 10000,
      status: "Completed",
    },
    {
      id: "static-4",
      date: "1/15/2024",
      description: "Phase 3 milestone",
      method: "Bank Transfer",
      amount: 10000,
      status: "Pending",
    },
  ];

  const [payments, setPayments] = useState(() => {
    try {
      if (!project) return defaultPayments;
      const raw = localStorage.getItem(`payments_project_${project.id}`);
      if (!raw) return defaultPayments;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return defaultPayments;
      return parsed;
    } catch (e) {
      return defaultPayments;
    }
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    date: "",
    description: "",
    method: "Bank Transfer",
    amount: "",
    status: "Completed",
  });
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);

  // persist payments to localStorage whenever they change
  useEffect(() => {
    if (!project) return;
    try {
      localStorage.setItem(`payments_project_${project.id}`, JSON.stringify(payments));
    } catch (e) {
      // ignore localStorage errors silently
      console.warn("Failed to save payments to localStorage", e);
    }
  }, [payments, project]);

  if (!project) {
    return <div className="p-8 text-gray-600">Project not found.</div>;
  }

  const paymentPercent = Math.round((project.paid / project.total) * 100);
  const tabs = ["Overview", "Timeline", "Payments"];

  // upcoming milestones unchanged
  const upcomingMilestones = [
    { title: "Countertops Installation", date: "Jan 20, 2024" },
    { title: "Appliance Delivery", date: "Feb 1, 2024" },
  ];

  // ---------- Handlers ----------
  function openAddPaymentModal() {
    setEditingPaymentId(null);
    setNewPayment({
      date: "",
      description: "",
      method: "Bank Transfer",
      amount: "",
      status: "Completed",
    });
    setShowPaymentModal(true);
  }

  function openEditPaymentModal(paymentId: string) {
    const p = payments.find((x) => x.id === paymentId);
    if (!p) return;
    setEditingPaymentId(paymentId);
    setNewPayment({
      date: p.date || "",
      description: p.description || "",
      method: p.method || "Bank Transfer",
      amount: String(p.amount ?? ""),
      status: p.status || "Completed",
    });
    setShowPaymentModal(true);
  }

 function handleSavePayment() {
  if (!newPayment.date || !newPayment.description || !newPayment.amount) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill date, description, and amount.",
    });
    return;
  }

  const numericAmount = Number(newPayment.amount);
  if (Number.isNaN(numericAmount)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Amount",
      text: "Please enter a valid number.",
    });
    return;
  }

  if (editingPaymentId) {
    // update existing payment
    setPayments((prev) =>
      prev.map((p) =>
        p.id === editingPaymentId
          ? {
              ...p,
              date: newPayment.date,
              description: newPayment.description,
              method: newPayment.method,
              amount: numericAmount,
              status: newPayment.status,
            }
          : p
      )
    );

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Your changes have been updated.",
      timer: 1500,
      showConfirmButton: false,
    });

  } else {
    // add new payment
    const uid =
      typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function"
        ? (crypto as any).randomUUID()
        : `id-${Date.now()}`;

    const newRow = {
      id: uid,
      date: newPayment.date,
      description: newPayment.description,
      method: newPayment.method,
      amount: numericAmount,
      status: newPayment.status,
    };

    setPayments((prev) => [...prev, newRow]);

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Payment has been recorded.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  // close modal
  setShowPaymentModal(false);
  setEditingPaymentId(null);
  setNewPayment({
    date: "",
    description: "",
    method: "Bank Transfer",
    amount: "",
    status: "Completed",
  });
}


  function handleDeletePayment(paymentId: string) {
    const confirmed = window.confirm("Delete this payment? This action cannot be undone.");
    if (!confirmed) return;
    setPayments((prev) => prev.filter((p) => p.id !== paymentId));
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto bg-white shadow rounded-xl p-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{project.name}</h1>
            <p className="text-gray-500">
              Client: <span className="font-medium">{project.client}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
                }`}
            >
              {project.status}
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${project.priority === "HIGH"
                  ? "bg-red-100 text-red-700"
                  : project.priority === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
            >
              {project.priority} Priority
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Top cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-gray-600 font-medium">Project Progress</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-blue-600 text-lg font-semibold">{project.progress}%</p>
                </div>
                <ProgressBar value={project.progress} color="blue" />
                <p className="text-sm text-gray-500 mt-1">Current Phase: {project.phase}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <p className="text-gray-600 font-medium">Payment Status</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-green-600 text-lg font-semibold">{paymentPercent}%</p>
                </div>
                <ProgressBar value={paymentPercent} color="green" />
                <p className="text-sm text-gray-500 mt-1">
                  ${project.paid.toLocaleString()} of ${project.total.toLocaleString()}
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <p className="text-gray-600 font-medium">Next Payment</p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="text-orange-500 w-5 h-5" />
                  <p className="text-lg font-semibold text-gray-800">
                    ${project.balance.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-1">Due: {project.nextPayment}</p>
              </div>
            </div>

            {/* Info sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Project Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Project Name:</span> {project.name}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span> Complete kitchen renovation
                    including custom cabinetry, granite countertops, new appliances, and electrical
                    updates.
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> 123 Oak Street, Springfield, IL
                  </p>
                  <div className="flex justify-between">
                    <p>
                      <span className="font-medium">Start Date:</span> 11/1/2023
                    </p>
                    <p>
                      <span className="font-medium">Est. Completion:</span> 2/15/2024
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-medium">Client</p>
                  <p>{project.client}</p>
                  <p>michael.johnson@email.com</p>
                  <p>+1 (555) 123-4567</p>

                  <p className="font-medium mt-3">Contractor</p>
                  <p>John Smith</p>
                  <p>+1 (555) 987-6543</p>
                </div>
              </div>
            </div>

            <RecentUpdates projectId={project.id} />
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === "Timeline" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Timeline</h2>
              <p className="text-sm text-gray-600">
                Started: <strong>11/1/2023</strong> &nbsp; | &nbsp; Est. Completion:{" "}
                <strong>2/15/2024</strong>
              </p>
              <ProgressBar value={project.progress} color="blue" />
              <p className="text-sm text-gray-500 mt-1 text-right">{project.progress}% Complete</p>
            </div>

            {/* Editable Timeline */}
            <EditableTimeline />
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "Payments" && (
          <div className="space-y-6">
            {/* Overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  ${project.total.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Paid Amount</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">
                  ${project.paid.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-2xl font-semibold text-orange-500 mt-1">
                  ${project.balance.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Progress</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-semibold text-blue-600 mt-1">{project.progress}%</p>
                  <p className="text-sm text-gray-400">{paymentPercent}% paid</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${paymentPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Payment Progress Bar */}
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Progress</h3>
              <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="absolute left-0 top-0 h-3 bg-green-500 rounded-full" style={{ width: `${paymentPercent}%` }} />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>${project.paid.toLocaleString()} paid</span>
                <span>${project.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white border rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
                <button
                  onClick={openAddPaymentModal}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                >
                  + Record Payment
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-t border-gray-200">
                  <thead className="bg-gray-50 text-gray-600 font-medium">
                    <tr>
                      <th className="py-2 px-3 text-left">Date</th>
                      <th className="py-2 px-3 text-left">Description</th>
                      <th className="py-2 px-3 text-left">Method</th>
                      <th className="py-2 px-3 text-left">Amount</th>
                      <th className="py-2 px-3 text-left">Status</th>
                      <th className="py-2 px-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map((payment, idx) => (
                      <tr key={payment.id ?? idx} className="hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-700">{payment.date}</td>
                        <td className="py-2 px-3 text-gray-700">{payment.description}</td>
                        <td className="py-2 px-3 text-gray-700">{payment.method}</td>
                        <td className="py-2 px-3 font-medium text-gray-800">${Number(payment.amount).toLocaleString()}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${payment.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex gap-3">
                            <button
                              title="Edit"
                              onClick={() => openEditPaymentModal(payment.id)}
                              className="p-1 rounded hover:bg-gray-100 transition"
                            >
                              <PencilLine className="h-4 w-4 text-gray-600 hover:text-gray-800" />
                            </button>

                            <button
                              title="Delete"
                              onClick={() =>
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "This payment will be permanently deleted.",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#d33",
                                  cancelButtonColor: "#3085d6",
                                  confirmButtonText: "Delete",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    handleDeletePayment(payment.id);
                                    Swal.fire("Deleted!", "Payment has been removed.", "success");
                                  }
                                })
                              }
                              className="p-1 rounded hover:bg-red-50 transition"
                            >
                              <Trash2 className="h-4 w-4 text-red-600 hover:text-red-700" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                    {payments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-gray-500">
                          No payments recorded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Next Payment Due Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Next Payment Due</h3>
                  <p className="text-sm text-gray-600">
                    Phase 3 Milestone Payment <br />
                    Due: {project.nextPayment}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-blue-700 mb-2">${project.balance.toLocaleString()}</p>
                  <button className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">Send Invoice</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {activeTab === "Documents" && <DocumentsTab />} */}

        {/* Placeholder tabs */}
        {/* {activeTab !== "Overview" && activeTab !== "Timeline" && (
            <div className="text-gray-500 text-center py-10">
              {activeTab} section coming soon.
            </div>
          )} */}

        {/* ------------------------ Modal (Add / Edit) ------------------------ */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingPaymentId ? "Edit Payment" : "Record Payment"}
              </h3>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <label className="block mb-1 font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded"
                    value={newPayment.date}
                    onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Description</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={newPayment.description}
                    onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Method</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={newPayment.method}
                    onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                  >
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>Check</option>
                    <option>Online Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Amount ($)</label>
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Status</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={newPayment.status}
                    onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
                  >
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setEditingPaymentId(null);
                  }}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSavePayment}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingPaymentId ? "Save Changes" : "Save Payment"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ---------------------- end modal ---------------------- */}
      </div>
    </main>
  );
}
