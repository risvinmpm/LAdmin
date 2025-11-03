import { useState } from "react";
import { CheckCircle2, Clock, AlertCircle, Edit2, Trash2, Save, X, Plus } from "lucide-react";

const initialTimeline = [
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

export default function EditableTimeline() {
  const [timeline, setTimeline] = useState(initialTimeline);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newPhase, setNewPhase] = useState({
    phase: "",
    status: "Pending",
    date: "",
    details: "",
    image: "",
  });

  const handleEdit = (index: number) => setEditingIndex(index);

  const handleSave = (index: number, updated: any) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index] = updated;
    setTimeline(updatedTimeline);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (!newPhase.phase || !newPhase.date) return alert("Please fill required fields");
    setTimeline([...timeline, newPhase]);
    setNewPhase({ phase: "", status: "Pending", date: "", details: "", image: "" });
  };

  return (
    <div className="space-y-8">
      {/* Timeline list */}
      <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
        {timeline.map((item, i) => {
          const Icon =
            item.status === "Completed"
              ? CheckCircle2
              : item.status === "In Progress"
              ? Clock
              : AlertCircle;

          const statusColor =
            item.status === "Completed"
              ? "text-green-600 bg-green-100"
              : item.status === "In Progress"
              ? "text-blue-600 bg-blue-100"
              : "text-gray-500 bg-gray-100";

          return (
            <div key={i} className="relative">
              <span
                className={`absolute -left-[31px] top-1 w-6 h-6 flex items-center justify-center rounded-full ${statusColor}`}
              >
                <Icon size={14} />
              </span>

              {editingIndex === i ? (
                <div className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
                  <input
                    value={item.phase}
                    onChange={(e) =>
                      handleSave(i, { ...item, phase: e.target.value })
                    }
                    placeholder="Phase"
                    className="border p-2 rounded w-full text-sm"
                  />
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleSave(i, { ...item, status: e.target.value })
                    }
                    className="border p-2 rounded w-full text-sm"
                  >
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Pending</option>
                  </select>
                  <input
                    value={item.date}
                    onChange={(e) =>
                      handleSave(i, { ...item, date: e.target.value })
                    }
                    type="date"
                    className="border p-2 rounded w-full text-sm"
                  />
                  <textarea
                    value={item.details}
                    onChange={(e) =>
                      handleSave(i, { ...item, details: e.target.value })
                    }
                    placeholder="Details"
                    className="border p-2 rounded w-full text-sm"
                  />
                  <input
                    value={item.image}
                    onChange={(e) =>
                      handleSave(i, { ...item, image: e.target.value })
                    }
                    placeholder="Image URL"
                    className="border p-2 rounded w-full text-sm"
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-200 rounded"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-gray-800">{item.phase}</h3>
                    <div className="flex gap-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.status}
                      </span>
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{item.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.phase}
                      className="w-36 h-36 object-cover rounded-full border mt-2"
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add new timeline item */}
      <div className="bg-blue-50 border rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Plus size={16} /> Add New Phase
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            placeholder="Phase name"
            value={newPhase.phase}
            onChange={(e) => setNewPhase({ ...newPhase, phase: e.target.value })}
            className="border p-2 rounded text-sm"
          />
          <select
            value={newPhase.status}
            onChange={(e) => setNewPhase({ ...newPhase, status: e.target.value })}
            className="border p-2 rounded text-sm"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <input
            type="date"
            value={newPhase.date}
            onChange={(e) => setNewPhase({ ...newPhase, date: e.target.value })}
            className="border p-2 rounded text-sm"
          />
          <input
            placeholder="Image URL"
            value={newPhase.image}
            onChange={(e) => setNewPhase({ ...newPhase, image: e.target.value })}
            className="border p-2 rounded text-sm"
          />
        </div>
        <textarea
          placeholder="Details"
          value={newPhase.details}
          onChange={(e) => setNewPhase({ ...newPhase, details: e.target.value })}
          className="border p-2 rounded text-sm w-full mt-3"
        />
        <button
          onClick={handleAdd}
          className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
        >
          Save Phase
        </button>
      </div>
    </div>
  );
}
