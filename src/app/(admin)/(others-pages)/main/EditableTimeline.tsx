"use client";
import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit2,
  Trash2,
  X,
  Plus,
} from "lucide-react";

interface TimelineItem {
  phase: string;
  status: string;
  date: string;
  details: string;
  images: string[]; // base64 Data URLs
}

const STORAGE_KEY = "timelineData_v2";

const defaultTimeline: TimelineItem[] = [
  {
    phase: "Project Started",
    status: "Completed",
    date: "2023-11-01",
    details: "Initial planning and design phase completed",
    images: [],
  },
  {
    phase: "Demolition",
    status: "Completed",
    date: "2023-11-15",
    details: "Old kitchen demolished and debris removed",
    images: [],
  },
  {
    phase: "Electrical Work",
    status: "Completed",
    date: "2023-12-01",
    details: "New electrical wiring and outlets installed",
    images: [],
  },
  {
    phase: "Carpentry",
    status: "In Progress",
    date: "2024-01-05",
    details: "Custom cabinets installation in progress",
    images: [],
  },
];

// Helper: convert FileList -> Array<base64 string>
const filesToBase64 = (files: FileList): Promise<string[]> =>
  Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () => reject(new Error("File read error"));
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(file);
        })
    )
  );

export default function EditableTimeline() {
  // Initialize timeline from localStorage synchronously to avoid mount-overwrite
  const [timeline, setTimeline] = useState<TimelineItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as TimelineItem[];
    } catch {
      /* ignore */
    }
    return defaultTimeline;
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newPhase, setNewPhase] = useState<TimelineItem>({
    phase: "",
    status: "Pending",
    date: "",
    details: "",
    images: [],
  });

  // Persist timeline on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timeline));
    } catch {
      /* ignore storage errors */
    }
  }, [timeline]);

  // Add new phase — use functional update to avoid stale closures
  const handleAdd = () => {
    if (!newPhase.phase.trim() || !newPhase.date.trim()) {
      alert("Please fill out Phase name and Date");
      return;
    }
    setTimeline((prev) => {
      const updated = [...prev, { ...newPhase }];
      // also store immediately (effect also runs, but this ensures immediate persistence)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // reset new phase
    setNewPhase({
      phase: "",
      status: "Pending",
      date: "",
      details: "",
      images: [],
    });
  };

  // Save edited item
  const handleSave = (index: number, updated: TimelineItem) => {
    setTimeline((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      } catch {}
      return copy;
    });
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    if (!confirm("Are you sure you want to delete this phase?")) return;
    setTimeline((prev) => {
      const copy = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      } catch {}
      return copy;
    });
    if (editingIndex !== null && editingIndex === index) setEditingIndex(null);
  };

  // Safe image upload handler:
  // - capture the real input element before any await
  // - convert files to base64 and then update state
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter?: any,
    item?: TimelineItem,
    index?: number
  ) => {
    const inputEl = e.currentTarget; // real DOM input element
    const files = inputEl.files;
    if (!files || files.length === 0) return;

    // convert => base64 (persistent across refresh)
    let base64Images: string[] = [];
    try {
      base64Images = await filesToBase64(files);
    } catch (err) {
      console.error("Failed to read files", err);
      alert("Failed to read files");
      return;
    }

    // If index is provided and item exists -> update existing timeline item
    if (typeof index === "number" && item) {
      setTimeline((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...item,
          images: [...(item.images || []), ...base64Images],
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
        } catch {}
        return copy;
      });
    } else if (typeof setter === "function") {
      // setter is expected to be setNewPhase
      // use functional form to be safe
      setter((prev: TimelineItem) => ({
        ...prev,
        images: [...(prev.images || []), ...base64Images],
      }));
    }

    // Safely reset the input element (we captured inputEl)
    try {
      inputEl.value = "";
    } catch {
      // ignore if can't reset
    }
  };

  return (
    <div className="space-y-8">
      {/* Timeline List */}
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
                    type="date"
                    value={item.date}
                    onChange={(e) =>
                      handleSave(i, { ...item, date: e.target.value })
                    }
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
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, null, item, i)}
                    className="border p-2 rounded w-full text-sm"
                  />

                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ))}
                  </div>

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
                    <div className="flex gap-2 items-center">
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
                        onClick={() => setEditingIndex(i)}
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

                  {item.images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Preview ${index}`}
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Phase */}
      <div className="bg-blue-50 border rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Plus size={16} /> Add New Phase
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            placeholder="Phase name"
            value={newPhase.phase}
            onChange={(e) =>
              setNewPhase({ ...newPhase, phase: e.target.value })
            }
            className="border p-2 rounded text-sm"
          />
          <select
            value={newPhase.status}
            onChange={(e) =>
              setNewPhase({ ...newPhase, status: e.target.value })
            }
            className="border p-2 rounded text-sm"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <input
            type="date"
            value={newPhase.date}
            onChange={(e) =>
              setNewPhase({ ...newPhase, date: e.target.value })
            }
            className="border p-2 rounded text-sm"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, setNewPhase)}
            className="border p-2 rounded text-sm"
          />
        </div>

        {newPhase.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {newPhase.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <textarea
          placeholder="Details"
          value={newPhase.details}
          onChange={(e) =>
            setNewPhase({ ...newPhase, details: e.target.value })
          }
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
