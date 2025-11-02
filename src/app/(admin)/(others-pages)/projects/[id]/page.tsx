  "use client";
  import { useParams } from "next/navigation";
  import { useState } from "react";
  import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
  import ProgressBar from "../../main/ProgressBar";
  import RecentUpdates from "../../main/RecentUpdates";
  import DocumentsTab from "../../main/DocumentsTab";

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

    if (!project) {
      return <div className="p-8 text-gray-600">Project not found.</div>;
    }

    const paymentPercent = Math.round((project.paid / project.total) * 100);
    const tabs = ["Overview", "Timeline", "Payments", "Documents"];

    // Timeline data
    const timeline = [
      {
        phase: "Project Started",
        status: "Completed",
        date: "11/1/2023",
        details: "Initial planning and design phase completed",
        image: "/timeline/countertop.jpg",
      },
      {
        phase: "Demolition",
        status: "Completed",
        date: "11/15/2023",
        details: "Old kitchen demolished and debris removed",
        image: "/timeline/countertop.jpg",
      },
      {
        phase: "Electrical Work",
        status: "Completed",
        date: "12/1/2023",
        details: "New electrical wiring and outlets installed",
        image: "/timeline/countertop.jpg",
      },
      {
        phase: "Plumbing",
        status: "Completed",
        date: "12/15/2023",
        details: "Water lines and gas connections updated",
        image: "/timeline/countertop.jpg",
      },
      {
        phase: "Carpentry",
        status: "In Progress",
        date: "1/5/2024",
        details: "Custom cabinets installation in progress",
        image: "/timeline/countertop.jpg",
      },
      {
        phase: "Countertops",
        status: "Pending",
        date: "1/20/2024",
        details: "Granite countertops measurement and installation",
        image: "/timeline/countertop.jpg",
      },
      {
        phase: "Appliances",
        status: "Pending",
        date: "2/1/2024",
        details: "New appliances delivery and installation",
        image: "/timeline/countertop.jpg",
      },
      {
        phase: "Final Inspection",
        status: "Pending",
        date: "2/15/2024",
        details: "Quality check and project completion",
        image: "/timeline/countertop.jpg",
      },
    ];

    const upcomingMilestones = [
      { title: "Countertops Installation", date: "Jan 20, 2024" },
      { title: "Appliance Delivery", date: "Feb 1, 2024" },
    ];

    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto bg-white shadow rounded-xl p-6">
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
                    <p><span className="font-medium">Project Name:</span> {project.name}</p>
                    <p>
                      <span className="font-medium">Description:</span> Complete kitchen renovation
                      including custom cabinetry, granite countertops, new appliances, and electrical
                      updates.
                    </p>
                    <p><span className="font-medium">Address:</span> 123 Oak Street, Springfield, IL</p>
                    <div className="flex justify-between">
                      <p><span className="font-medium">Start Date:</span> 11/1/2023</p>
                      <p><span className="font-medium">Est. Completion:</span> 2/15/2024</p>
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
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Project Timeline
                </h2>
                <p className="text-sm text-gray-600">
                  Started: <strong>11/1/2023</strong> &nbsp; | &nbsp; Est. Completion:{" "}
                  <strong>2/15/2024</strong>
                </p>
                <ProgressBar value={project.progress} color="blue" />
                <p className="text-sm text-gray-500 mt-1 text-right">
                  {project.progress}% Complete
                </p>
              </div>

              <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
                {timeline.map((item, i) => {
                  const statusColor =
                    item.status === "Completed"
                      ? "text-green-600 bg-green-100"
                      : item.status === "In Progress"
                        ? "text-blue-600 bg-blue-100"
                        : "text-gray-500 bg-gray-100";
                  const Icon =
                    item.status === "Completed"
                      ? CheckCircle2
                      : item.status === "In Progress"
                        ? Clock
                        : AlertCircle;

                  return (
                    <div key={i} className="relative">
                      <span
                        className={`absolute -left-[31px] top-1 w-6 h-6 flex items-center justify-center rounded-full ${statusColor}`}
                      >
                        <Icon size={14} />
                      </span>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-gray-800">{item.phase}</h3>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${item.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : item.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-500"
                              }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                        {/* ✅ Image Thumbnail */}
                        {item.image && (
                          <div className="mt-3">
                            <img
                              src={item.image}
                              alt={item.phase}
                              className="w-36 h-36 object-cover rounded-full border"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upcoming Milestones */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Upcoming Milestones
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {upcomingMilestones.map((m, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg bg-blue-50 text-blue-700 flex justify-between items-center"
                    >
                      <p className="font-medium">{m.title}</p>
                      <p className="text-sm">{m.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                    <p className="text-2xl font-semibold text-blue-600 mt-1">
                      {project.progress}%
                    </p>
                    <p className="text-sm text-gray-400">{paymentPercent}% paid</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${paymentPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Progress Bar */}
              <div className="bg-white border rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Payment Progress
                </h3>
                <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="absolute left-0 top-0 h-3 bg-green-500 rounded-full"
                    style={{ width: `${paymentPercent}%` }}
                  />
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
                  <h3 className="text-lg font-semibold text-gray-800">
                    Payment History
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          date: "11/1/2023",
                          description: "Initial deposit",
                          method: "Bank Transfer",
                          amount: 10000,
                          status: "Completed",
                        },
                        {
                          date: "12/1/2023",
                          description: "Phase 1 completion",
                          method: "Check",
                          amount: 15000,
                          status: "Completed",
                        },
                        {
                          date: "1/5/2024",
                          description: "Phase 2 milestone",
                          method: "Bank Transfer",
                          amount: 10000,
                          status: "Completed",
                        },
                        {
                          date: "1/15/2024",
                          description: "Phase 3 milestone",
                          method: "Bank Transfer",
                          amount: 10000,
                          status: "Pending",
                        },
                      ].map((payment, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="py-2 px-3 text-gray-700">{payment.date}</td>
                          <td className="py-2 px-3 text-gray-700">{payment.description}</td>
                          <td className="py-2 px-3 text-gray-700">{payment.method}</td>
                          <td className="py-2 px-3 font-medium text-gray-800">
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${payment.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Next Payment Due Card */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Next Payment Due
                    </h3>
                    <p className="text-sm text-gray-600">
                      Phase 3 Milestone Payment <br />
                      Due: {project.nextPayment}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-blue-700 mb-2">
                      ${project.balance.toLocaleString()}
                    </p>
                    <button className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                      Send Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Documents" && <DocumentsTab />}


          {/* Placeholder tabs */}
          {/* {activeTab !== "Overview" && activeTab !== "Timeline" && (
            <div className="text-gray-500 text-center py-10">
              {activeTab} section coming soon.
            </div>
          )} */}
        </div>

      </main>
    );
  }
