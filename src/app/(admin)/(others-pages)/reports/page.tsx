"use client";

import { useState } from "react";
import { Download, Filter, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface Payment {
  id: string;
  project: string;
  client: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  method: string;
  phase: string;
}

interface QAStatus {
  id: string;
  project: string;
  phase: string;
  status: "Passed" | "Pending" | "Requires Action";
  date: string;
  inspector: string;
  notes: string;
}

interface SupportTicket {
  id: string;
  project: string;
  client: string;
  issue: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "Low" | "Medium" | "High";
  created: string;
  assignee: string;
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"payments" | "qa" | "support" | "notifications">("payments");

  const payments: Payment[] = [
    { id: "PAY-001", project: "Villa Renovation", client: "John Smith", amount: 25000, status: "Paid", date: "2024-01-15", method: "Bank Transfer", phase: "Design Phase" },
    { id: "PAY-002", project: "Office Interior", client: "Sarah Johnson", amount: 18500, status: "Overdue", date: "2024-01-10", method: "Check", phase: "Carpentry Phase" },
    { id: "PAY-003", project: "Kitchen Remodel", client: "Michael Brown", amount: 12750, status: "Pending", date: "2024-01-20", method: "Credit Card", phase: "Painting Phase" },
    { id: "PAY-004", project: "Bathroom Upgrade", client: "Emily Davis", amount: 8900, status: "Paid", date: "2024-01-12", method: "Bank Transfer", phase: "Final Phase" },
  ];

  const qaStatuses: QAStatus[] = [
    { id: "QA-001", project: "Villa Renovation", phase: "Woodwork", status: "Passed", date: "2024-01-18", inspector: "Mike Wilson", notes: "All woodwork meets quality standards" },
    { id: "QA-002", project: "Office Interior", phase: "Electrical", status: "Requires Action", date: "2024-01-16", inspector: "Sarah Chen", notes: "Minor wiring adjustments needed" },
    { id: "QA-003", project: "Kitchen Remodel", phase: "Painting", status: "Pending", date: "2024-01-20", inspector: "David Lee", notes: "Scheduled for inspection" },
    { id: "QA-004", project: "Bathroom Upgrade", phase: "Plumbing", status: "Passed", date: "2024-01-14", inspector: "Lisa Garcia", notes: "All plumbing work approved" },
  ];

  const supportTickets: SupportTicket[] = [
    { id: "SUP-001", project: "Villa Renovation", client: "John Smith", issue: "Paint touch-up needed", status: "Closed", priority: "Low", created: "2024-01-10", assignee: "Mike Wilson" },
    { id: "SUP-002", project: "Office Interior", client: "Sarah Johnson", issue: "Door handle loose", status: "In Progress", priority: "Medium", created: "2024-01-15", assignee: "David Lee" },
    { id: "SUP-003", project: "Kitchen Remodel", client: "Michael Brown", issue: "Cabinet door alignment", status: "Open", priority: "High", created: "2024-01-18", assignee: "Lisa Garcia" },
    { id: "SUP-004", project: "Bathroom Upgrade", client: "Emily Davis", issue: "Faucet dripping", status: "Closed", priority: "Medium", created: "2024-01-08", assignee: "Sarah Chen" },
  ];

  const notificationLogs = [
    { id: "NOT-001", type: "Project Update", recipient: "John Smith", project: "Villa Renovation", message: "Design phase completed - 100%", status: "Delivered", sent: "2024-01-18 10:30 AM", priority: "Medium" },
    { id: "NOT-002", type: "Payment Reminder", recipient: "Sarah Johnson", project: "Office Interior", message: "Payment overdue - $18,500", status: "Delivered", sent: "2024-01-17 09:15 AM", priority: "High" },
    { id: "NOT-003", type: "QA Alert", recipient: "Michael Brown", project: "Kitchen Remodel", message: "QA inspection scheduled for tomorrow", status: "Pending", sent: "2024-01-19 02:45 PM", priority: "Medium" },
    { id: "NOT-004", type: "Support Update", recipient: "Emily Davis", project: "Bathroom Upgrade", message: "Support ticket resolved - Faucet fixed", status: "Delivered", sent: "2024-01-16 04:20 PM", priority: "Low" },
  ];

  // === Summary Counts ===
  const totalPaid = payments.filter(p => p.status === "Paid").reduce((a, b) => a + b.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((a, b) => a + b.amount, 0);
  const totalOverdue = payments.filter(p => p.status === "Overdue").reduce((a, b) => a + b.amount, 0);

  const qaPassed = qaStatuses.filter(q => q.status === "Passed").length;
  const qaPending = qaStatuses.filter(q => q.status === "Pending").length;
  const qaAction = qaStatuses.filter(q => q.status === "Requires Action").length;

  const ticketOpen = supportTickets.filter(t => t.status === "Open").length;
  const ticketInProgress = supportTickets.filter(t => t.status === "In Progress").length;
  const ticketClosed = supportTickets.filter(t => t.status === "Closed").length;

  const notifDelivered = notificationLogs.filter(n => n.status === "Delivered").length;
  const notifPending = notificationLogs.filter(n => n.status === "Pending").length;
  const notifFailed = notificationLogs.filter(n => n.status === "Failed").length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header + Tabs */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-lg font-semibold">Generate Reports</h1>
        <p className="text-sm text-gray-500">Download and analyze project data</p>

        <div className="flex flex-wrap gap-4 mt-4 border-b border-gray-200">
          {[
            { key: "payments", label: "Payment History" },
            { key: "qa", label: "QA Status Logs" },
            { key: "support", label: "Support Tickets" },
            { key: "notifications", label: "Notification Logs" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-t-md text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters — shown for all tabs */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-semibold text-gray-700 mb-4">Report Filters</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Projects</option>
            <option>Villa Renovation</option>
            <option>Office Interior</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Clients</option>
            <option>John Smith</option>
            <option>Sarah Johnson</option>
          </select>
          <button className="bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium">
            <Filter size={16} /> Apply Filters
          </button>
        </div>
      </div>

      {/* Conditional Tabs */}
      {activeTab === "payments" && (
        <>
          <SummaryGrid data={[
            { title: "Total Paid", value: totalPaid, color: "green", icon: <CheckCircle /> },
            { title: "Total Pending", value: totalPending, color: "orange", icon: <Clock /> },
            { title: "Total Overdue", value: totalOverdue, color: "red", icon: <AlertTriangle /> },
          ]} />
          <TableWrapper title="Payment History">
            <PaymentTable payments={payments} />
          </TableWrapper>
        </>
      )}

      {activeTab === "qa" && (
        <>
          <SummaryGrid data={[
            { title: "Passed", value: qaPassed, color: "green", icon: <CheckCircle /> },
            { title: "Pending", value: qaPending, color: "orange", icon: <Clock /> },
            { title: "Requires Action", value: qaAction, color: "red", icon: <AlertTriangle /> },
          ]} />
          <TableWrapper title="QA Status Logs">
            <QATable qaStatuses={qaStatuses} />
          </TableWrapper>
        </>
      )}

      {activeTab === "support" && (
        <>
          <SummaryGrid data={[
            { title: "Open Tickets", value: ticketOpen, color: "red", icon: <AlertTriangle /> },
            { title: "In Progress", value: ticketInProgress, color: "orange", icon: <Clock /> },
            { title: "Closed Tickets", value: ticketClosed, color: "green", icon: <CheckCircle /> },
          ]} />
          <TableWrapper title="Support Tickets">
            <SupportTable tickets={supportTickets} />
          </TableWrapper>
        </>
      )}

      {activeTab === "notifications" && (
        <>
          <SummaryGrid data={[
            { title: "Delivered", value: notifDelivered, color: "green", icon: <CheckCircle /> },
            { title: "Pending", value: notifPending, color: "orange", icon: <Clock /> },
            { title: "Failed", value: notifFailed, color: "red", icon: <AlertTriangle /> },
          ]} />
          <TableWrapper title="Notification Logs">
            <NotificationTable logs={notificationLogs} />
          </TableWrapper>
        </>
      )}
    </div>
  );
}

/* --- Reusable Components --- */

function SummaryGrid({ data }: { data: any[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {data.map((item, i) => (
        <SummaryCard key={i} {...item} />
      ))}
    </div>
  );
}

function SummaryCard({ title, value, color, icon }: { title: string; value: number; color: string; icon: React.ReactNode }) {
  const colorClasses: Record<string, string> = {
    green: "text-green-600 bg-green-50",
    orange: "text-orange-600 bg-orange-50",
    red: "text-red-600 bg-red-50",
  };
  return (
    <div className="p-5 bg-white shadow rounded-lg flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className={`text-2xl font-bold ${colorClasses[color].split(" ")[0]}`}>{value}</h3>
      </div>
      <div className={`p-2 rounded-full ${colorClasses[color]}`}>{icon}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-700",
    Overdue: "bg-red-100 text-red-700",
    Passed: "bg-green-100 text-green-700",
    "Requires Action": "bg-red-100 text-red-700",
    Open: "bg-red-100 text-red-700",
    "In Progress": "bg-orange-100 text-orange-700",
    Closed: "bg-green-100 text-green-700",
    Delivered: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
  };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>{status}</span>;
}

function TableWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <button className="bg-blue-600 text-white flex items-center gap-2 px-3 py-1 rounded text-sm">
          <Download size={14} /> Download CSV
        </button>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

/* --- Tables --- */
function PaymentTable({ payments }: { payments: Payment[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Payment ID</th>
          <th>Project</th>
          <th>Client</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
          <th>Method</th>
          <th>Phase</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(p => (
          <tr key={p.id} className="border-b">
            <td className="p-3 font-semibold">{p.id}</td>
            <td>{p.project}</td>
            <td>{p.client}</td>
            <td className="font-semibold">${p.amount.toLocaleString()}</td>
            <td><StatusBadge status={p.status} /></td>
            <td>{p.date}</td>
            <td>{p.method}</td>
            <td>{p.phase}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function QATable({ qaStatuses }: { qaStatuses: QAStatus[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">QA ID</th>
          <th>Project</th>
          <th>Phase</th>
          <th>Status</th>
          <th>Date</th>
          <th>Inspector</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {qaStatuses.map(q => (
          <tr key={q.id} className="border-b">
            <td className="p-3 font-semibold">{q.id}</td>
            <td>{q.project}</td>
            <td>{q.phase}</td>
            <td><StatusBadge status={q.status} /></td>
            <td>{q.date}</td>
            <td>{q.inspector}</td>
            <td>{q.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SupportTable({ tickets }: { tickets: SupportTicket[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Ticket ID</th>
          <th>Project</th>
          <th>Client</th>
          <th>Issue</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Created</th>
          <th>Assignee</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(t => (
          <tr key={t.id} className="border-b">
            <td className="p-3 font-semibold">{t.id}</td>
            <td>{t.project}</td>
            <td>{t.client}</td>
            <td>{t.issue}</td>
            <td><StatusBadge status={t.status} /></td>
            <td>{t.priority}</td>
            <td>{t.created}</td>
            <td>{t.assignee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NotificationTable({ logs }: { logs: any[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">ID</th>
          <th>Type</th>
          <th>Recipient</th>
          <th>Project</th>
          <th>Message</th>
          <th>Status</th>
          <th>Sent</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(n => (
          <tr key={n.id} className="border-b">
            <td className="p-3 font-semibold">{n.id}</td>
            <td>{n.type}</td>
            <td>{n.recipient}</td>
            <td>{n.project}</td>
            <td>{n.message}</td>
            <td><StatusBadge status={n.status} /></td>
            <td>{n.sent}</td>
            <td>{n.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
