"use client";
import { CalendarDays, Eye, Edit3 } from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  priority: string;
  status: string;
  phase: string;
  progress: number;
  total: number;
  paid: number;
  balance: number;
  nextPayment: string;
  overdue: boolean;
}

export default function ProjectCard({ project }: { project: Project }) {
  const priorityColors: Record<string, string> = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-yellow-100 text-yellow-600",
    LOW: "bg-green-100 text-green-600",
  };

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-blue-100 text-blue-600",
    COMPLETED: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.client}</p>
        </div>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[project.priority]}`}
          >
            {project.priority}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700">
          Current Phase:{" "}
          <span className="font-semibold text-gray-800">{project.phase}</span>
        </p>
        <div className="h-2 bg-gray-200 rounded-full mt-1">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{project.progress}%</p>
      </div>

      {/* Financial Info */}
      <div className="grid grid-cols-3 text-sm mb-3">
        <div>
          <p className="text-gray-500">Total</p>
          <p className="font-bold text-gray-800">${project.total.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Paid</p>
          <p className="font-bold text-green-600">${project.paid.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Balance</p>
          <p
            className={`font-bold ${
              project.balance === 0 ? "text-gray-400" : "text-orange-500"
            }`}
          >
            ${project.balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div
        className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md mb-4 ${
          project.overdue ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
        }`}
      >
        <CalendarDays size={16} />
        {project.overdue ? (
          <p>
            Next Payment: {project.nextPayment}{" "}
            <span className="font-medium">(Overdue)</span>
          </p>
        ) : (
          <p>Next Payment: {project.nextPayment}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex items-center justify-center gap-2 w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          <Eye size={16} /> View
        </button>
        <button className="flex items-center justify-center gap-2 w-1/2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800">
          <Edit3 size={16} /> Edit
        </button>
      </div>
    </div>
  );
}
