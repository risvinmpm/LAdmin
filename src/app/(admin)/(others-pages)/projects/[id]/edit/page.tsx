// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { CalendarDays, Save, X } from "lucide-react";
// import { motion } from "framer-motion";

// interface Project {
//   id: number;
//   name: string;
//   client: string;
//   phase: string;
//   progress: number;
//   description: string;
//   total: number;
//   priority: string;
//   startDate: string;
//   endDate: string;
// }

// export default function EditProjectPage() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [project, setProject] = useState<Project | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Simulate fetching project data
//   useEffect(() => {
//     setTimeout(() => {
//       setProject({
//         id: Number(id),
//         name: "Johnson Residence Kitchen",
//         client: "Michael Johnson",
//         phase: "Carpentry",
//         progress: 85,
//         description: "Brief description of the project scope and requirements",
//         total: 45000,
//         priority: "High Priority",
//         startDate: "2023-11-01",
//         endDate: "2024-02-15",
//       });
//       setLoading(false);
//     }, 600);
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     if (!project) return;
//     const { name, value } = e.target;
//     setProject({ ...project, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Updated Project:", project);
//     router.push(`/projects/${id}`);
//   };

//   if (loading) {
//     return <p className="text-center py-10 text-gray-500">Loading project...</p>;
//   }

//   if (!project) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         Edit Project
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Project Name */}
//         <div className="grid grid-cols-2">
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Project Name *
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={project.name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Client Name */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Client Name *
//           </label>
//           <input
//             type="text"
//             name="client"
//             value={project.client}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Current Phase */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Current Phase
//           </label>
//           <select
//             name="phase"
//             value={project.phase}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           >
//             <option>Planning</option>
//             <option>Design</option>
//             <option>Carpentry</option>
//             <option>Finishing</option>
//             <option>Completed</option>
//           </select>
//         </div>

//         {/* Progress */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Progress (%)
//           </label>
//           <input
//             type="number"
//             name="progress"
//             value={project.progress}
//             min={0}
//             max={100}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//           <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//             <div
//               className="bg-blue-600 h-2 rounded-full"
//               style={{ width: `${project.progress}%` }}
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Project Description
//           </label>
//           <textarea
//             name="description"
//             rows={3}
//             value={project.description}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Total Value */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Total Project Value *
//           </label>
//           <input
//             type="number"
//             name="total"
//             value={project.total}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">
//             Priority Level
//           </label>
//           <select
//             name="priority"
//             value={project.priority}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           >
//             <option>High Priority</option>
//             <option>Medium Priority</option>
//             <option>Low Priority</option>
//           </select>
//         </div>

//         {/* Dates */}
//         <div className="grid grid-cols-2 gap-5">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Start Date *
//             </label>
//             <div className="relative">
//               <CalendarDays className="absolute left-3 top-2.5 text-gray-400" size={18} />
//               <input
//                 type="date"
//                 name="startDate"
//                 value={project.startDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Estimated Completion *
//             </label>
//             <div className="relative">
//               <CalendarDays className="absolute left-3 top-2.5 text-gray-400" size={18} />
//               <input
//                 type="date"
//                 name="endDate"
//                 value={project.endDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 pt-4">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
//           >
//             <X size={16} /> Cancel
//           </button>
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             <Save size={16} /> Save Changes
//           </motion.button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }
