"use client";

import { useState } from "react";
import { CalendarDays, Eye, Edit3, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  description: string;
  startDate: string;
  endDate: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project>(project);

  const priorityColors: Record<string, string> = {
    "HIGH": "bg-red-100 text-red-600",
    "MEDIUM": "bg-yellow-100 text-yellow-600",
    "LOW": "bg-green-100 text-green-600",
    "High Priority": "bg-red-100 text-red-600",
    "Medium Priority": "bg-yellow-100 text-yellow-600",
    "Low Priority": "bg-green-100 text-green-600",
  };

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-blue-100 text-blue-600",
    COMPLETED: "bg-green-100 text-green-600",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditProject({ ...editProject, [name]: value });
  };

  const handleSave = () => {
    console.log("Saved Project:", editProject);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Project Card */}
      <div className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition-all">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.client}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[project.priority]}`}>
              {project.priority}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700">
            Current Phase: <span className="font-semibold text-gray-800">{project.phase}</span>
          </p>
          <div className="h-2 bg-gray-200 rounded-full mt-1">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{project.progress}%</p>
        </div>

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
            <p className={`font-bold ${project.balance === 0 ? "text-gray-400" : "text-orange-500"}`}>
              ${project.balance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md mb-4 ${project.overdue ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
          }`}>
          <CalendarDays size={16} />
          {project.overdue ? (
            <p>Next Payment: {project.nextPayment} <span className="font-medium">(Overdue)</span></p>
          ) : (
            <p>Next Payment: {project.nextPayment}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/projects/${project.id}`)}
            className="flex items-center justify-center gap-2 w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            <Eye size={16} /> View
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 w-1/2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
          >
            <Edit3 size={16} /> Edit
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-3xl mx-4 shadow-lg overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Edit Project</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={editProject.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Client Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Client Name *</label>
                    <input
                      type="text"
                      name="client"
                      value={editProject.client}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">

                  {/* Current Phase */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Current Phase</label>
                    <select
                      name="phase"
                      value={editProject.phase}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Planning</option>
                      <option>Design</option>
                      <option>Carpentry</option>
                      <option>Finishing</option>
                      <option>Completed</option>
                    </select>
                  </div>

                  {/* Progress */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Progress (%)</label>
                    <input
                      type="number"
                      name="progress"
                      value={editProject.progress}
                      min={0}
                      max={100}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${editProject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Project Description</label>
                  <textarea
                    name="description"
                    value={editProject.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* Total */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Total Project Value *</label>
                    <input
                      type="number"
                      name="total"
                      value={editProject.total}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Priority Level</label>
                    <select
                      name="priority"
                      value={editProject.priority}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>High Priority</option>
                      <option>Medium Priority</option>
                      <option>Low Priority</option>
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={editProject.startDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Completion *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={editProject.endDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
