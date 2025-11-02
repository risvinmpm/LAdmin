"use client";
import { useState } from "react";
import ProjectCard from "../main/ProjectCard";

export default function BlankPage() {
  const [activeTab, setActiveTab] = useState("All Projects");

  // ✅ Sample Project Data
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
      nextPayment: "2024-01-15",
      overdue: true,
      deadline: "2024-02-01",
      issues: 2,
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
      nextPayment: "2024-01-20",
      overdue: true,
      deadline: "2024-02-10",
      issues: 0,
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
      nextPayment: "2024-01-25",
      overdue: true,
      deadline: "2024-03-05",
      issues: 3,
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
      nextPayment: "2024-02-10",
      overdue: false,
      deadline: "2024-03-15",
      issues: 1,
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
      deadline: "2024-01-10",
      issues: 0,
    },
  ];

  // 🧮 Tab Counts
  const counts = {
    all: projects.length,
    active: projects.filter((p) => p.status === "ACTIVE").length,
    completed: projects.filter((p) => p.status === "COMPLETED").length,
    overdue: projects.filter((p) => p.overdue).length,
    deadline: projects.filter(
      (p) => new Date(p.deadline) < new Date("2024-03-01") // sample condition
    ).length,
    issues: projects.filter((p) => p.issues > 0).length,
  };

  // 🧭 Tabs Setup
  const tabs = [
    { name: "All Projects", count: counts.all, icon: "📁" },
    { name: "Active", count: counts.active, icon: "🟢" },
    { name: "Completed", count: counts.completed, icon: "✅" },
    { name: "Overdue Payments", count: counts.overdue, icon: "⚠️" },
    { name: "Deadline", count: counts.deadline, icon: "⏰" },
    { name: "Issues", count: counts.issues, icon: "🐞" },
  ];

  // 🔍 Filtered Projects
  const filteredProjects = projects.filter((project) => {
    switch (activeTab) {
      case "Active":
        return project.status === "ACTIVE";
      case "Completed":
        return project.status === "COMPLETED";
      case "Overdue Payments":
        return project.overdue;
      case "Deadline":
        return new Date(project.deadline) < new Date("2024-03-01"); // projects due soon
      case "Issues":
        return project.issues > 0;
      default:
        return true;
    }
  });

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center justify-between gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.icon} {tab.name}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No projects found for this category.
          </div>
        )}
      </div>
    </main>
  );
}
