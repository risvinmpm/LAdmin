"use client";

import { useState, useMemo } from "react";
import {
  Download,
  Plus,
  Eye,
  ArrowDownToLine,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

interface Payment {
  id: string;
  client: string;
  project: string;
  phase: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue" | "Partial";
  paymentDate?: string;
  method?: string;
  overdueDays?: number;
  paidAmount?: number;
}

const paymentsData: Payment[] = [
  {
    id: "PAY-001",
    client: "Rajesh Kumar",
    project: "Villa Renovation",
    phase: "Advance Payment",
    amount: 500000,
    dueDate: "2024-01-15",
    status: "Paid",
    paymentDate: "2024-01-12",
    method: "Bank Transfer",
  },
  {
    id: "PAY-002",
    client: "Priya Sharma",
    project: "Office Interior",
    phase: "Design Phase",
    amount: 150000,
    dueDate: "2024-01-20",
    status: "Pending",
  },
  {
    id: "PAY-003",
    client: "Amit Patel",
    project: "Apartment Design",
    phase: "Construction",
    amount: 750000,
    dueDate: "2024-01-10",
    status: "Overdue",
    overdueDays: 653,
  },
  {
    id: "PAY-004",
    client: "Sunita Gupta",
    project: "Restaurant Design",
    phase: "Finishing",
    amount: 300000,
    paidAmount: 150000,
    dueDate: "2024-01-25",
    paymentDate: "2024-01-22",
    status: "Partial",
    method: "UPI",
  },
  {
    id: "PAY-005",
    client: "Vikram Singh",
    project: "Villa Renovation",
    phase: "Final Payment",
    amount: 200000,
    dueDate: "2024-01-30",
    paymentDate: "2024-01-28",
    status: "Paid",
    method: "Cheque",
  },
];

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("All Payments");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [phaseFilter, setPhaseFilter] = useState("All Phases");
  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filteredPayments = useMemo(() => {
    return paymentsData.filter((p) => {
      const matchesStatus =
        statusFilter === "All Payments" || p.status === statusFilter;
      const matchesProject =
        projectFilter === "All Projects" || p.project === projectFilter;
      const matchesPhase =
        phaseFilter === "All Phases" || p.phase === phaseFilter;
      const matchesSearch =
        p.client.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesProject && matchesPhase && matchesSearch;
    });
  }, [statusFilter, projectFilter, phaseFilter, search]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Payment Management</h1>
        <p className="text-gray-500">
          Track project payments and financial status
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Total Revenue"
          value="₹45,67,890"
          subText="+12% from last month"
          iconColor="bg-green-100 text-green-600"
        />
        <SummaryCard
          title="Pending Payments"
          value="₹8,45,000"
          subText="5 invoices pending"
          iconColor="bg-blue-100 text-blue-600"
        />
        <SummaryCard
          title="Overdue"
          value="₹2,15,000"
          subText="2 payments overdue"
          iconColor="bg-red-100 text-red-600"
        />
        <SummaryCard
          title="This Month"
          value="₹12,34,500"
          subText="8 payments received"
          iconColor="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="border border-gray-300 rounded-md p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Payments</option>
            <option>Paid</option>
            <option>Partial</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>

          <select
            className="border border-gray-300 rounded-md p-2"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option>All Projects</option>
            {Array.from(new Set(paymentsData.map((p) => p.project))).map(
              (project) => (
                <option key={project}>{project}</option>
              )
            )}
          </select>

          <select
            className="border border-gray-300 rounded-md p-2"
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
          >
            <option>All Phases</option>
            {Array.from(new Set(paymentsData.map((p) => p.phase))).map(
              (phase) => (
                <option key={phase}>{phase}</option>
              )
            )}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search payments..."
            className="border border-gray-300 rounded-md p-2 w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700">
            <Download size={16} /> Export Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
            <Plus size={16} /> Record Payment
          </button>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Payment Records</h2>
          <p className="text-sm text-gray-500">
            Showing {filteredPayments.length} payments
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Client & Project</th>
                <th className="py-3 px-4">Phase</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-blue-600">
                    {p.id}
                    {p.paymentDate && (
                      <div className="text-xs text-gray-400">
                        Paid: {p.paymentDate}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{p.client}</div>
                    <div className="text-gray-500 text-sm">{p.project}</div>
                  </td>
                  <td className="px-4 py-3">{p.phase}</td>
                  <td className="px-4 py-3 font-semibold">
                    ₹{p.amount.toLocaleString()}
                    {p.paidAmount && (
                      <div className="text-xs text-green-600">
                        Paid: ₹{p.paidAmount.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">{p.dueDate}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                    {p.method && (
                      <div className="text-xs text-gray-400">{p.method}</div>
                    )}
                    {p.overdueDays && (
                      <div className="text-xs text-red-500">
                        {p.overdueDays} days overdue
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2 text-gray-500">
                    <Eye
                      size={16}
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => setSelectedPayment(p)}
                    />
                    <ArrowDownToLine
                      size={16}
                      className="cursor-pointer hover:text-green-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/*  PAYMENT DETAILS MODAL + ACTIONS + SWEETALERT INTEGRATION              */}
      {/* ---------------------------------------------------------------------- */}

      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-[950px] p-8 relative"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => setSelectedPayment(null)}
              >
                <X size={20} />
              </button>

              {/* Header */}
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <p className="text-sm text-gray-500 mb-6">
                Payment ID: {selectedPayment.id}
              </p>

              {/* GRID 2 COL */}
              <div className="grid grid-cols-2 gap-8">

                {/* LEFT SECTION */}
                <div className="space-y-6">

                  {/* Payment Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Payment Information</h3>
                    <div className="space-y-1 text-sm">

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`
                      px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1
                      ${selectedPayment.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : selectedPayment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : selectedPayment.status === "Overdue"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                            }
                    `}
                        >
                          {selectedPayment.status === "Paid" && (
                            <CheckCircle2 size={14} />
                          )}
                          {selectedPayment.status}
                        </span>
                      </div>

                      <p className="text-[15px]">
                        Amount:{" "}
                        <span className="font-semibold">
                          ₹{selectedPayment.amount.toLocaleString()}
                        </span>
                      </p>

                      {selectedPayment.status === "Partial" &&
                        selectedPayment.paidAmount && (
                          <p className="text-green-600 text-[15px]">
                            Paid Amount: ₹{selectedPayment.paidAmount.toLocaleString()}
                          </p>
                        )}

                      <p className="text-[15px]">Due Date: {selectedPayment.dueDate}</p>

                      {selectedPayment.paymentDate && (
                        <p className="text-[15px]">Paid Date: {selectedPayment.paymentDate}</p>
                      )}

                      {selectedPayment.method && (
                        <p className="text-[15px]">Payment Method: {selectedPayment.method}</p>
                      )}

                      {selectedPayment.status === "Overdue" &&
                        selectedPayment.overdueDays && (
                          <p className="text-red-600 text-[15px]">
                            {selectedPayment.overdueDays} days overdue
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Client & Project</h3>
                    <div className="space-y-1 text-sm">
                      <p>Client: <span className="font-medium">{selectedPayment.client}</span></p>
                      <p>Project: {selectedPayment.project}</p>
                      <p>Phase: {selectedPayment.phase}</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="space-y-6">

                  {/* Timeline */}
                  <div>
                    <h3 className="font-semibold mb-3">Payment Timeline</h3>

                    <div className="space-y-4 text-sm">

                      {/* Created */}
                      <div className="flex items-start gap-2">
                        <Plus className="text-blue-500 mt-0.5" size={18} />
                        <div>
                          <p className="font-medium text-gray-700">Payment Created</p>
                          <p className="text-gray-500 text-xs">
                            Record created for {selectedPayment.phase}
                          </p>
                        </div>
                      </div>

                      {/* Received (Paid + Partial) */}
                      {(selectedPayment.status === "Paid" ||
                        selectedPayment.status === "Partial") && (
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="text-green-600 mt-0.5" size={18} />
                            <div>
                              <p className="font-medium text-gray-700">
                                Payment Received
                              </p>
                              <p className="text-gray-500 text-xs">
                                {selectedPayment.status === "Paid"
                                  ? "Full payment received"
                                  : "Partial payment received"}{" "}
                                on{" "}
                                {selectedPayment.paymentDate}
                              </p>
                            </div>
                          </div>
                        )}

                      {/* Overdue */}
                      {selectedPayment.status === "Overdue" && (
                        <div className="flex items-start gap-2">
                          <Clock className="text-red-500 mt-0.5" size={18} />
                          <div>
                            <p className="font-medium text-gray-700">Payment Overdue</p>
                            <p className="text-gray-500 text-xs">
                              Due date passed ({selectedPayment.dueDate}) <br />
                              {selectedPayment.overdueDays} days overdue.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Payment Progress */}
                  <div>
                    <h3 className="font-semibold mb-3">Project Payment Progress</h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Advance Payment</span>
                        <span className="text-green-600 font-medium">✓ Paid</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Design Phase</span>
                        <span className="text-green-600 font-medium">✓ Paid</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Construction</span>
                        <span className="text-blue-600 font-medium">• Current</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Finishing</span>
                        <span className="text-gray-400">Pending</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Final Payment</span>
                        <span className="text-gray-400">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex justify-end gap-3">

                {/* Pending → Mark as Paid */}
                {selectedPayment.status === "Pending" && (
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Mark as Paid?",
                        text: "This payment will be marked as fully paid.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes, mark paid",
                      }).then((res) => {
                        if (res.isConfirmed) {
                          Swal.fire("Success", "Payment marked as paid!", "success");
                        }
                      });
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Mark as Paid
                  </button>
                )}

                {/* Overdue → Send Reminder */}
                {selectedPayment.status === "Overdue" && (
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Send Reminder?",
                        text: `Send payment reminder email to ${selectedPayment.client}?`,
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonText: "Send Reminder",
                      }).then((res) => {
                        if (res.isConfirmed) {
                          Swal.fire("Sent!", "Reminder email sent successfully.", "success");
                        }
                      });
                    }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                  >
                    Send Reminder
                  </button>
                )}

                {/* EXPORT MENU */}
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Export Invoice",
                      html: `
                  <div style="display:flex;flex-direction:column;gap:10px;text-align:left;">
                    <button id="download" style="padding:8px 12px;border-radius:6px;border:1px solid #ddd;">Download Invoice</button>
                    <button id="print" style="padding:8px 12px;border-radius:6px;border:1px solid #ddd;">Print Invoice</button>
                    <button id="preview" style="padding:8px 12px;border-radius:6px;border:1px solid #ddd;">Preview Invoice</button>
                  </div>
                `,
                      showConfirmButton: false,
                    });

                    setTimeout(() => {
                      document.getElementById("download")?.addEventListener("click", () =>
                        Swal.fire("Downloaded", "Invoice downloaded successfully.", "success")
                      );
                      document.getElementById("print")?.addEventListener("click", () =>
                        Swal.fire("Printing...", "Invoice sent to printer.", "success")
                      );
                      document.getElementById("preview")?.addEventListener("click", () =>
                        Swal.fire("Preview Opened", "Invoice preview opened.", "success")
                      );
                    }, 10);
                  }}
                  className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Export Invoice
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Edit Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function SummaryCard({
  title,
  value,
  subText,
  iconColor,
}: {
  title: string;
  value: string;
  subText: string;
  iconColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 bg-white rounded-xl shadow-sm flex items-center gap-4"
    >
      <div className={`p-3 rounded-lg ${iconColor}`}>
        <span className="text-lg font-bold">₹</span>
      </div>
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <div className="text-xl font-semibold">{value}</div>
        <div className="text-xs text-gray-400">{subText}</div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Payment["status"] }) {
  const colors = {
    Paid: "bg-green-100 text-green-700",
    Partial: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}
